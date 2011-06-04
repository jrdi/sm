// // init variables
// timeline = {
//   currentPage: 1,
//   lastPage: "",
//   scope: ""
// }
// 
// isLastPage = false;
// isURLized = true;
// 
// $(document).ready(function() {
//   // init functions
//   $.urlParam = function(name){
//     results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
//     if (!results) { return 0; }
//     return results[1] || 0;
//   }
// 
//   $.getParams = function() {
//     if(isURLized) {
//       if($.urlParam('page') != 0) {
//         timeline.currentPage = parseInt($.urlParam('page'));
//       }
// 
//       if($.urlParam('question_pages') != 0) {
//         timeline.lastPage = $.urlParam('question_pages');
//       }
// 
//       if($.urlParam('scoped_questions') != 0) {
//         timeline.scope = $.urlParam('scoped_questions');
//       }
//     }
//   }
// 
//   $.resetParams = function() {
//     timeline.currentPage = 1;
//     timeline.lastPage = "";
//     timeline.scope = "";
//     isLastPage = false;
//     isURLized = false;
//   }
// 
//   // $.resetTags = function() {
//   //   Tags = [];
//   // }
//   // 
//   // $.resetQuestions = function() {
//   //   Questions = [];
//   //   $.resetTags();
//   // }
//   // 
//   // $.resetAnswers = function() {
//   //   Answers = [];
//   // }
// 
// //   $.fn.serializeObject = function()
// //   {
// //       var o = {};
// //       var a = this.serializeArray();
// //       $.each(a, function() {
// //           if (o[this.name] !== undefined) {
// //               if (!o[this.name].push) {
// //                   o[this.name] = [o[this.name]];
// //               }
// //               o[this.name].push(this.value || '');
// //           } else {
// //               o[this.name] = this.value || '';
// //           }
// //       });
// //       return o;
// //   };
// // });