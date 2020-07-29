interface ILiveEventProprty {
  _awayScore: String;
  _awayTeamName: String;
  _code: Number;
  _countryName: String;
  _eventDate: Date;
  _eventDatetimeStamp: Number;
  _eventId: Number;
  _eventType: Number;
  _eventTypeName: String;
  _homeScore: String;
  _homeTeamName: String;
  _id: Number;
  _isFavorite: Boolean;
  _isInCoupon: Boolean;
  _isLiveEvent: Boolean;
  _leagueCode: String;
  _leagueName: String;
  _leaguePriority: Number;
  _mbc: Number;
  _parts: Array<Object>;
  _playTime: Number;
  _score: String;
  _status: String;
  _statusCode: Number;
}

export default class LiveEventProperty implements ILiveEventProprty {
  constructor(event) {
    this.setPropertyValues(event);
  }

  public _awayScore;
  public _awayTeamName;
  public _code;
  public _countryName;
  public _eventDate;
  public _eventDatetimeStamp;
  public _eventId;
  public _eventType;
  public _eventTypeName;
  public _homeScore;
  public _homeTeamName;
  public _id;
  public _isFavorite;
  public _isInCoupon;
  public _isLiveEvent;
  public _leagueCode;
  public _leagueName;
  public _leaguePriority;
  public _mbc;
  public _parts: Array<Object> = [];
  public _playTime;
  public _score;
  public _status;
  public _publicstatusCode;
  public _statusCode;
  public setPropertyValues(event) {
    this._awayScore = event.awayScore;
    this._awayTeamName = event.awayTeamName;
    this._code = event.code;
    this._countryName = event.countryName;
    this._eventDatetimeStamp = event.eventDatetimeStamp;
    this._eventId = event.eventId;
    this._eventType = event.eventType;
    this._eventTypeName = event.eventTypeName;
    this._homeScore = event.homeScore;
    this._homeTeamName = event.homeTeamName;
    this._id = event.id;
    this._isFavorite = event.isFavorite;
    this._isInCoupon = event.isInCoupon;
    this._isLiveEvent = event.isLiveEvent;
    this._leagueCode = event.leagueCode;
    this._leagueName = event.leagueName;
    this._leaguePriority = event.leaguePriority;
    this._mbc = event.mbc;
    if (Array.isArray(event.parts)) {
      event.parts.map((item) => {
        this._parts.push(new MatchPartProperties(item));
      });
    }
    this._playTime = event.playTime;
    this._score = event.score;
    this._status = event.status;
    this._statusCode = event.statusCode;
  }
}

class MatchPartProperties {
  constructor(part) {
    this.setPropertyValues(part);
  }

  public _awayScore = null;
  public _homeScore = null;
  public _part = undefined;
  public _score = undefined;

  public setPropertyValues(part) {
    this._awayScore = part.awayScore;
    this._homeScore = part.homeScore;
    this._part = part.part;
    this._score = part.score;
  }
}
