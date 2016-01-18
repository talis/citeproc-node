module.exports = function(grunt) {

  require('jit-grunt')(grunt,{
    lambda_invoke:'grunt-aws-lambda',
    lambda_package:'grunt-aws-lambda',
    lambda_deploy:'grunt-aws-lambda',
    clean:'grunt-contrib-clean'
  });

  grunt.initConfig({
    lambda_invoke: {
      'acm-sig-proceedings':{
        options:{
          event:'event.acm-sig-proceedings.json'
        }
      },
      'american-medical-association':{
        options:{
          event:'event.american-medical-association.json'
        }
      },
      'apa':{
        options:{
          event:'event.apa.json'
        }
      },
      'american-sociological-association':{
        options:{
          event:'event.american-sociological-association.json'
        }
      },
      'bibtex':{
        options:{
          event:'event.bibtex.json'
        }
      },
      'bmj':{
        options:{
          event:'event.bmj.json'
        }
      },
      'chicago-author-date':{
        options:{
          event:'event.chicago-author-date.json'
        }
      },
      'harvard-cite-them-right':{
        options: {
          event:'event.harvard-cite-them-right.json'
        }
      },
      'ieee-with-url':{
        options:{
          event:'event.ieee-with-url.json'
        }
      },
      'modern-language-association-with-url':{
        options:{
          event:'event.modern-language-association-with-url.json'
        }
      },
      'national-library-of-medicine-grant-proposals':{
        options:{
          event:'event.national-library-of-medicine-grant-proposals.json'
        }
      },
      'nature':{
        options:{
          event:'event.nature.json'
        }
      },
      'springer-lecture-notes-in-computer-science':{
        options:{
          event:'event.springer-lecture-notes-in-computer-science.json'
        }
      },
      'vancouver':{
        options: {
          event:'event.vancouver.json'
        }
      },
      options: {
        file_name:'./citeServerLambda'
      }
    },
    lambda_deploy: {
      default: {
        arn: grunt.option('arn')
      }
    },
    lambda_package: {
      default: {
      }
    },
    testStyles:[
      'acm-sig-proceedings',
      'american-medical-association',
      'apa',
      'american-sociological-association',
      'bibtex',
      'bmj',
      'chicago-author-date',
      'harvard-cite-them-right',
      'ieee-with-url',
      'modern-language-association-with-url',
      'national-library-of-medicine-grant-proposals',
      'nature',
      'springer-lecture-notes-in-computer-science',
      'vancouver'
    ],
    clean:{
      dist:{
        src:["**/dist/*.zip"]
      },
      events:{
        src:["**/event.*.json"]
      }
    }
  });

  grunt.registerTask('createEvent', function(style){
    var data = {
      "path":"/?responseformat=json&style="+style,
      "body":{
        "items":[{"id":"ITEM-1","type":"Resource","title":"2","container-title":"Compilers: Principles, Techniques, and Tools (2nd Edition): Alfred V. Aho, Monica S. Lam, Ravi Sethi, Jeffrey D. Ullman: 9780321486813: Amazon.com: Books","publisher":"Addison Wesley; 2nd edition (September 10, 2006)"},{"id":"ITEM-2","type":"book","title":"The Design and Implementation of the 4.3 BSD UNIX Operating System: Samuel J. Leffler, Marshall Kirk McKusick, Michael J. Karels, John S. Quarterman, Samuel Leffler: 9780201061963: Amazon.com: Books","publisher":"Addison-Wesley; 1st edition (October 1, 1989)","URL":"http:\/\/www.amazon.com\/Design-Implementation-UNIX-Operating-System\/dp\/0201061961"},{"id":"ITEM-3","type":"Resource","title":"2","container-title":"Compilers: Principles, Techniques, and Tools (2nd Edition): Alfred V. Aho, Monica S. Lam, Ravi Sethi, Jeffrey D. Ullman: 9780321486813: Amazon.com: Books","publisher":"Addison Wesley; 2nd edition (September 10, 2006)"},{"id":"ITEM-4","type":"book","title":"The Design and Implementation of the 4.3 BSD UNIX Operating System: Samuel J. Leffler, Marshall Kirk McKusick, Michael J. Karels, John S. Quarterman, Samuel Leffler: 9780201061963: Amazon.com: Books","publisher":"Addison-Wesley; 1st edition (October 1, 1989)","URL":"http:\/\/www.amazon.com\/Design-Implementation-UNIX-Operating-System\/dp\/0201061961"},{"id":"ITEM-5","type":"book","title":"The Design and Implementation of the 4.3 BSD UNIX Operating System: Samuel J. Leffler, Marshall Kirk McKusick, Michael J. Karels, John S. Quarterman, Samuel Leffler: 9780201061963: Amazon.com: Books","publisher":"Addison-Wesley; 1st edition (October 1, 1989)","URL":"http:\/\/www.amazon.com\/Design-Implementation-UNIX-Operating-System\/dp\/0201061961"},{"id":"ITEM-6","type":"Resource","title":"2","container-title":"Compilers: Principles, Techniques, and Tools (2nd Edition): Alfred V. Aho, Monica S. Lam, Ravi Sethi, Jeffrey D. Ullman: 9780321486813: Amazon.com: Books","publisher":"Addison Wesley; 2nd edition (September 10, 2006)"}]
      },
      "query":{
        "responseformat":"json",
        "style":style
      }
    };
    grunt.file.write('./event.'+style+'.json', JSON.stringify(data));
  });

  grunt.registerMultiTask('testStyles', function(){
    var style = this.data;

    console.log('Testing style:'+style);

    grunt.task.run('createEvent:'+style);
    grunt.task.run('lambda_invoke:'+style);
  });

  grunt.registerTask('test', function(){
    grunt.task.run(['testStyles', 'clean:events']);
  });
  grunt.registerTask('dist', ['lambda_package']);
  grunt.registerTask('deploy', ['clean:dist', 'clean:events', 'lambda_package', 'lambda_deploy']);

  grunt.registerTask('default', ['test']);
};
