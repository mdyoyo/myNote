
var Waterline = require('waterline');
var mysqlAdapter = require('sails-mysql');
var mongoAdapter = require('sails-mongo');


//适配器
var adapters = {
    mongo:mongoAdapter,
    mysql:mysqlAdapter,
    default:'mongo'
};

//连接
var connections = {
    mymongo:{
        adapter:'mongo',
        url:'mongodb://localhost:27017/notes'
    },
    mymysql:{
        adapter:'mysql',
        url:'mysql://mynode:123456@localhost/mynode'
    }
};
var User = Waterline.Collection.extend({
    identity:'User',
    connection:'mymongo',
    schema:true,
    attributes:{
        username:{
            type:'string',
            required:true
        },
        password:{
            type:'string',
            required:true
        },
        email:{
            type:'string'
        },
        birthday:{
            type:'date',
            after:new Date('1991-01-01'),
            before:function(){
                return new Date();
            }
        },
        createTime:{
            type:'date'
        },
        migrate:'safe'
    },
    //生命周期回调
    beforeCreate:function(value,cb){
        value.createTime = new Date();
        console.log('beforeCreate executed');
        return cb();
    }
});

var Note = Waterline.Collection.extend({
    identity:'Note',
    connection:'mymongo',
    schema:true,
    attributes:{
        title:{
            type:'string',
            required:true
        },
        author:{
            type:'string',
            required:true
        },
        tag:{
            type:'string'
        },
        content:{
            type:'string'
        },
        createTime:{
            type:'date'
        },
        migrate:'safe'
    },
    //生命周期回调
    beforeCreate:function(value,cb){
        value.createTime = new Date();
        console.log('beforeCreate executed');
        return cb();
    }
});

var orm = new Waterline();

//加载数据集合
orm.loadCollection(User);
orm.loadCollection(Note);

var config = {
    adapters:adapters,
    connections:connections
}

//orm.initialize(config,function(err,models){
//    if(err){
//        console.err('orm initialize failed',err);
//        return;
//    }
//   //console.log('models:',modles);
//    models.connections.user.create({username:'Sid'},function(err,user){
//        console.log('after user.create,err,user:',err,user);
//    });
//});

exports.orm = orm;
exports.config = config;

