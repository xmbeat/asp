import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';


@Injectable()
export class ConfigurationProvider {
	private defaultConnection: any = {name: 'configuration.db', location: 'default'};
	private sqliteDB: SQLiteObject = null;
  private db: DatabaseProvider;
	private table:string;
	public configs: any = {};
	constructor(){
		this.table = "Configurations";
		this.db = new DatabaseProvider();
	}

	setDatabase(db: SQLiteObject){
		this.db.setDatabase(db);
	}

	init(): Promise<any>{
		let promise: Promise<any> = null;
		if (this.sqliteDB == null){
			promise = new SQLite().create(this.defaultConnection).then(database=>{
				this.sqliteDB  = database;
				this.db.setDatabase(database);
			})
		}
		else{
			promise = Promise.resolve();
		}
		return promise.then(()=>{
			return this.db.createTable(this.table, {key: ["TEXT", "NOT NULL"], value: ["TEXT"]})
			.then(()=>{
				this.db.get(this.table).then(configs=>{
						 let result = {};
						 for (let config of configs){
							 result[config['key']] = JSON.parse(config['value']);
						 }
						 this.configs = result;
					});
			});
		});		
	}

	save(): Promise<any>{
		if (this.configs == null || this.configs.length == 0){
			return Promise.reject(new Error("Configurations is empty"));
		}

		let promesa: Promise<any> = null;
	    for(let key in this.configs){
	      let row = {};
	      row['key'] = key;
	      row['value'] = JSON.stringify(this.configs[key]);
	      //Si ya habia una promesa (Un guardado anterior ejecutandose)
	      if (promesa != null){
	        promesa = promesa.then(()=>{
	          return this.db.save(this.table, row, ["key"]).then();
	        });
	      }
	      else{
	        promesa = this.db.save(this.table, row, ["key"]);
	      }
	    }
	    return promesa;
	}

	get(key){
		return this.configs[key];
	}
	
	set(key, value){
		this.configs[key] = value;
	}
}