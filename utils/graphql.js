var Gql = require('wxapp-graphql');
var GraphQL = Gql.GraphQL;
var config = require('../config.js')

var gql = GraphQL({
  //设置全局url
  url: config.service.host, // url必填

  //设置全居动态header
  header: function() {
    return {
      // something....
      'X-Test-Header': 'test header content'
    }
  },
  //设置全居错误拦截
  errorHandler: function(res) {
    //do something
  }
}, true);

module.exports = gql;