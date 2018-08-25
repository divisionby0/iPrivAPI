//TODO errors about https://github.com/ifedapoolarewaju/igdm/issues/60

//var login = 'easy_painting_feo';
//var password = '9997tIy5B8';

var _scope = this;

var instaLoginService;
_scope.instaGetFollowersService = null;
var selfUser;
_scope.getAccountFollowers = null;

var currentSession;


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var _ = require('lodash');
var Promise = require('bluebird');
var cors = require('cors');

var getFollowers = require('./div0/followers/GetAccountFollowers');
var massLikingTask = require('./div0/like/MassLikingTask');

var events = require('events');
var eventEmitter = new events.EventEmitter();

var indexRouter = require('./routes/index');

var mediaCounterIncrements = [1,2];

//var additionalAccounts = ["kirill.zhilkin", "kristina.sharipova22", "bionsetoo", "romanchuk69katrin", "anna_karat", "rabbitpark_", "dtcl1_1", "olgafilini", "garmoniya.feo", "logika_feo", "vikulichka_se", "evgeniyashuyts", "moroz91.ru", "aleksandrazoz", "annaguk2304", "muccuc_maria", "shefernatalia", "tamara_kuz", "cynep_mama", "mariavtoford", "irinaboikokudakova", "lizzflx", "alina__kalandadze", "alekseevaliubov1988", "marlenusy", "zuzernova", "lena_tolmacheva14", "klimaver", "tanya_kuzminaa_", "michael_icon", "katyshaa_25", "svetorana", "litekate", "ermaklena86", "dariia.meow", "gorskaya_margarita29", "soshnikova1810", "tasya_01.08", "natashabylgakova1981", "ilmira.bolotyan", "annapinchuk1", "victoria.trishina", "lena_tolmacheva14", "natanext", "mama_natascha", "olesya_black_olesya", "luchistui_pirogok","nysha.p", "shutterstruck", "belofoto", "anusha_bon", "mis_ekaterina_velikaya", "sensory_mom", "anna_pikalovafit", "zirenka", "aquapark_koktebel", "konsetulechka", "fedenkomila", "feodosiya_news", "ekaterina.goncharova", "ssvet_lana_s", "lesik100590", "lina_96_01", "irinavladimirovna_______", "avershina90", "svetlanaminashova77", "gorelova.elen", "natalya_domarova", "katekrym", "alexandrashindina", "anastasia_ai_da_olegovna", "tri_kota_feo", "tatyana_strelcova", "milenanew32", "evgenya93drobot", "chitalochka_feo", "__jane.art__", "aktyusha", "krim_otdih"];

_scope.app = express();

var user = require('./div0/user/user');

// services
var loginService = require('./div0/service/api/InstaLoginService');
var getFollowersService = require('./div0/service/api/InstaGetFollowersService');
var _massLikeService = require('./div0/service/api/InstaMassLikingService');

var loginUser = require('./div0/user/loginUser');

var accountsCollection = [];


// view engine setup
_scope.app.set('views', path.join(__dirname, 'views'));
_scope.app.set('view engine', 'jade');

_scope.app.use(logger('dev'));
_scope.app.use(express.json());
_scope.app.use(express.urlencoded({ extended: false }));
_scope.app.use(cookieParser());
_scope.app.use(express.static(path.join(__dirname, 'public')));

_scope.app.use('/', indexRouter);

_scope.app.use(cors({origin: 'http://instagramprivateapi'}));

// create services
instaLoginService = new loginService.InstaLoginService(_scope.app, eventEmitter);
_scope.instaGetFollowersService = new getFollowersService.InstaGetFollowersService(_scope.app, eventEmitter);
_scope.massLikeService = new _massLikeService.InstaMassLikingService(_scope.app, eventEmitter);

// catch 404 and forward to error handler
_scope.app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
_scope.app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var Client = require('instagram-private-api').V1;
var device = new Client.Device('someuser2');
var storage = new Client.CookieMemoryStorage();

this.onSelfLoginComplete = function(user){
    selfUser = user;
    currentSession = loginUser.getSession();
    console.log("self login complete.");
    instaLoginService.sendCompleteResponse(selfUser.id);
};

this.onSelfLoginError = function(error){
    instaLoginService.sendErrorResponse(error);
};

this.onFollowersLoadComplete = function(data){
    var accountId = data.accountId;
    var accountFollowers = data.followers;

    _scope.instaGetFollowersService.sendCompleteResponse(accountFollowers);
};

this.createInterval = function(){
    return Math.round(Math.random()*10)*1000;
};

this.removeCollectionDuplicates = function(sourceArray){
    return sourceArray.filter( onlyUnique );
};
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

this.createListeners = function(){
    eventEmitter.on('onLoginRequest', _scope.onLoginRequest);
    eventEmitter.on('onGetFollowersRequest', _scope.onGetFollowersRequest);
    eventEmitter.on('onMassLikingRequest', _scope.onMassLikingRequest);
    eventEmitter.on('onAccountMassLikingOperationComplete', _scope.onAccountMassLikingOperationComplete);
    eventEmitter.on('onAccountMassLikingTaskComplete', _scope.onAccountMassLikingTaskComplete);

    eventEmitter.on('onSelfLoginComplete', _scope.onSelfLoginComplete);
    eventEmitter.on('onSelfLoginError', _scope.onSelfLoginError);

    eventEmitter.on("onFollowersLoadComplete", _scope.onFollowersLoadComplete);
};

this.onLoginRequest = function(data){
    console.log("onLoginRequest()", data);
    loginUser.execute(Client, device, storage, data.login, data.password, eventEmitter);
};
this.onGetFollowersRequest = function(data){
    console.log("onGetFollowersRequest data=",data);
    _scope.getAccountFollowers = getFollowers.GetAccountFollowers(Client, currentSession, eventEmitter, data.accountId);
};
this.onMassLikingRequest = function(data){
    _scope.massLikeTask = massLikingTask.MassLikingTask(Client, currentSession, eventEmitter, data);
};
this.onAccountMassLikingOperationComplete = function(accountName){
    _scope.massLikeService.sendAccountCompleteResponse(accountName);
};
this.onAccountMassLikingTaskComplete = function(){
    _scope.massLikeService.sendCompleteResponse();
};

this.onFollowersCountComplete = function(data){
    console.log("onFollowersCountComplete");
    var accountId = data.accountId;
    var total = data.total;
    console.log("onFollowersCountComplete accountId="+accountId+" total="+total);
};

_scope.createListeners();

module.exports = _scope.app;
