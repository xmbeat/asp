export class GuardModel{
    name = 'guard';
    fields = {
        id: {
            name: 'Identificador',
            type: 'id',
        },
    
        image:{
            name: 'Imagen',
            icon: 'camera',
            type: 'imageb64',
            required: false,
        },
        first_name:{
            name: 'Nombre',
            icon: 'person',
            type: 'string',
            required: true,
        },
        last_name:{
            name: 'Apellido',
            type: 'string',
            required: true,
        },
        gender:{
            name: 'Género',
            type: 'enum',
            values:["Masculino", "Femenino"]
        },
        permissions:{
            name: 'Permisos',
            icon: 'list-box',
            type: 'multiple',
            values:['Agregar usuarios', 'Modificar usuarios', 'Agregar visitas'],
        },
        email:{
            name: 'Email',
            icon: 'mail',
            type: 'string',
            required: true,
        },
        phone:{
            name: "Teléfono",
            icon: 'call',
            type: 'integer',
        },
        password:{
            name: "Contraseña",
            icon: 'key',
            type: 'password',
        }
    };      
}

export class LocationModel{
    name = 'location';
    fields = {
        id: {
            type: 'id',
            name: 'Identificador'
        },
        name: {
            type: 'string',
            name: 'Locación',
            icon: 'compass',
            required: true,
        },
        type: {
            name: 'Tipo',
            type: 'enum',
            values: ['Privada', 'Evento', 'Empresa'],
            required: true,
        },
        supervisors: {
            name: 'Supervisores',
            type: 'multiple',
            reference: 'GuardModel',
        }
    };
}