angular.module('ngMail', [])
    .service('delayedDataService', function($q, $timeout) {
        return function(dataToResolve) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $timeout(() => deferred.resolve(dataToResolve), Math.random() * 10000);
            return promise;
        }
    })
    .service('MailService', function(delayedDataService) {
        this.getPageTabs = () => delayedDataService([
                {title: 'Primary', id: 'home', icon: 'glyphicon-inbox', active: true},
                {title: 'Social', id: 'profile', icon: 'glyphicon-user'},
                {title: 'Promotions', id: 'messages', icon: 'glyphicon-tags'},
                {title: '', id: 'settings', icon: 'glyphicon-plus no-margin'}
            ]);
        this.getPaginationState = () => delayedDataService({
                count: 150,
                from: 20,
                to: 40
            });
        this.getMailFoldersList = () => delayedDataService([
            {title: 'Inbox', link: '#inbox', active: true, unreadCount: Math.floor(Math.random()*100) },
            {title: 'Starred', link: '#starred' },
            {title: 'Important', link: '#important' },
            {title: 'Sent Mail', link: '#send_mail' }
        ]);
        this.getMailListItems = () => delayedDataService([1,2,3,4,5,6,7,8,9,10,11].map((item) => ({
            title: `Email title ${item}`,
            preview: `Preview for email #${item}....`,
            time: `${Math.floor(Math.random()*12)}:${Math.floor(Math.random()*60)} ${(Math.random()>0.5) ? 'AM' : 'PM'}`,
            wasRead: Math.random() > 0.8
        })));
        this.getPageMenuItems = () => delayedDataService([
            {title: 'Email', link: '#email', active: true },
            {title: 'Contacts', link: '#contact' },
            {title: 'Another menu', link: '#another_menu' }
        ]);
    })
    .directive('ngmailSelectPageMenu', function() {
        return  {
            restrict: 'E',
            scope: {
              list: '='
            },
            template: `
                    <div class="col-sm-3 col-md-2">
                        <div class="btn-group">
                            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                                {{list[0].title}} <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu">
                                <li ng-repeat="item in list track by $index"><a href="{{item.link}}">{{item.title}}</a></li>
                            </ul>
                        </div>
                    </div>`
        }
    })
    .directive('ngmailListItem', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                item: '='
            },
            template: `
                    <a href="#" class="list-group-item {{item.wasRead? 'read': ''}}">
                        <div class="checkbox"><label><input type="checkbox"></label></div>
                        <span class="glyphicon glyphicon-star-empty"></span>
                        <span class="name" style="min-width: 120px; display: inline-block;">{{item.title}}</span>
                        <span class="">{{item.preview}}</span>
                        <span class="text-muted" style="font-size: 11px;">- More content here</span>
                        <span class="badge">{{item.time}}</span>
                        <span class="pull-right"><span class="glyphicon glyphicon-paperclip"></span></span>
                    </a>`
        }
    })
    .directive('ngmailFoldersList', function() {
        return {
            restrict: 'E',
            scope: {
                list: '='
            },
            link: function(scope) {
                scope.setActive = function(item) {
                    this.list.forEach((item) => item.active = false);
                    item.active = true;
                };
            },
            template: `
                <ul class="nav nav-pills nav-stacked">
                    <li ng-repeat="item in list track by $index" class="{{item.active? 'active': ''}}">
                        <a href="{{item.link}}" ng-click="setActive(item);">
                        <span class="badge pull-right" ng-show="item.unreadCount">{{item.unreadCount}}</span>
                        {{item.title}}
                        </a>
                    </li>
                </ul>`
        }
    })
    .directive('ngmailPageTabs', function() {
        return {
            restrict: 'E',
            scope: {
                list: '='
            },
            template: `
                <ul class="nav nav-tabs">
                    <li ng-repeat="item in list track by $index" class="{{item.active? 'active': ''}}"><a href="#{{item.id}}" data-toggle="tab"><span class="glyphicon {{item.icon}}"></span>{{item.title}}</a></li>
                </ul>`
        }
    })
    .directive('ngmailListPaginator', function() {
        return {
            restrict: 'E',
            scope: {
                state: '='
            },
            template: `
                    <span class="text-muted"><b>{{state.from}}</b>–<b>{{state.to}}</b> of <b>{{state.count}}</b></span>
                    <div class="btn-group btn-group-sm">
                        <button type="button" class="btn btn-default">
                            <span class="glyphicon glyphicon-chevron-left"></span>
                        </button>
                        <button type="button" class="btn btn-default">
                            <span class="glyphicon glyphicon-chevron-right"></span>
                        </button>
                    </div>`
        }
    })
    .controller('PageController', function(MailService) {
        MailService.getPageMenuItems().then((data) => this.pageMenuItems = data);
        MailService.getMailListItems().then((data) => this.mailListItems = data);
        MailService.getMailFoldersList().then((data) => this.mailFoldersList = data);
        MailService.getPaginationState().then((data) => this.paginationState = data);
        MailService.getPageTabs().then((tabs) => this.pageTabs = tabs);
    });