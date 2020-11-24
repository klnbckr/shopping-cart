const config = {
    user: 'foo', 
    password: 'foo', 
    server:'localhost',
    database: 'shopping',
    port: 1433,
    options:{
        trustedconnection: true,
        enableArithAbort : true, 
        instancename :'SQLEXPRESS'
    },
}

module.exports = config;