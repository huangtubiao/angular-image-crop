(function(window, angular) {
    'use strict';

    angular.module('myApp')

    .directive('uploaderImgCrop', function() {
        return {
            restrict: 'AE',
            templateUrl: '/views/share/image-crop.html',
            replace: true,
            scope: {
                avatar: '='
            },
            link: function(scope, $element, attrs) {
                scope.fileChanged = function(e) {
                    var files = e.target.files;
                    var fileReader = new FileReader();

                    fileReader.readAsDataURL(files[0]);

                    fileReader.onload = function(e) {
                        scope.imgSrc = this.result;
                        scope.$apply();
                    };
                }       
               
                scope.clear = function() {
                    scope.imageCropStep = 1;
                    delete scope.imgSrc;
                    delete scope.result;
                    delete scope.resultBlob;
                    $element.find('#fileInput')[0].value = "";
                };

                scope.save = function() {
                    if (!!scope.result) {
                        var result = {};
                        result['image'] = scope.result;

                        var fd = new FormData();
                        fd.append("image", scope.resultBlob);
                        var oReq = new XMLHttpRequest();
                        oReq.open("POST", "/profile/logo");
                        oReq.onload = function(oEvent) {
                            if (oReq.status == 200) {
                                scope.avatar = scope.result;
                                console.dir('上传图片成功啦！');
                            } else {
                                console.dir('更新头像失败');
                            }
                        };
                        oReq.send(fd);
                    } else {
                        console.dir('请剪切图片后上传');
                    }
                };
            }
        };
    });

})(window, window.angular);
