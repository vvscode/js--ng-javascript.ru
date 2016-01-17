angular.module('ngMail', [])
    .directive('ngmailSelectPageMenu', function() {
        return  {
            restrict: 'E',
            template: `
                    <div class="col-sm-3 col-md-2">
                        <div class="btn-group">
                            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                                EMail <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="#">Mail</a></li>
                                <li><a href="#">Contacts</a></li>
                                <li><a href="#">Tasks</a></li>
                            </ul>
                        </div>
                    </div>`
        }
    })
    .directive('ngmailListItem', function() {
        return {
            restrict: 'E',
            template: `
                    <a href="#" class="list-group-item read">
                        <div class="checkbox"><label><input type="checkbox"></label></div>
                        <span class="glyphicon glyphicon-star-empty"></span>
                        <span class="name" style="min-width: 120px; display: inline-block;">Muhammad Faizan Uddin</span>
                        <span class="">Nice work on the lastest version</span>
                        <span class="text-muted" style="font-size: 11px;">- More content here</span>
                        <span class="badge">12:10 AM</span>
                        <span class="pull-right"><span class="glyphicon glyphicon-paperclip"></span></span>
                    </a>`
        }
    })
    .directive('ngmailFoldersList', function() {
        return {
            restrict: 'E',
            template: `
                <ul class="nav nav-pills nav-stacked">
                    <li class="active"><a href="#"><span class="badge pull-right">32</span> Inbox</a></li>
                    <li><a href="#">Starred</a></li>
                    <li><a href="#">Important</a></li>
                    <li><a href="#">Sent Mail</a></li>
                    <li><a href="#"><span class="badge pull-right">3</span>Drafts</a></li>
                </ul>`
        }
    })
    .directive('ngmailPageTabs', function() {
        return {
            restrict: 'E',
            template: `
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#home" data-toggle="tab"><span class="glyphicon glyphicon-inbox"></span>Primary</a></li>
                    <li><a href="#profile" data-toggle="tab"><span class="glyphicon glyphicon-user"></span>Social</a></li>
                    <li><a href="#messages" data-toggle="tab"><span class="glyphicon glyphicon-tags"></span>Promotions</a></li>
                    <li><a href="#settings" data-toggle="tab"><span class="glyphicon glyphicon-plus no-margin"></span></a></li>
                </ul>`
        }
    })
    .controller('PageController', function() {

    });