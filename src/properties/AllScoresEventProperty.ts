interface IAllScoreProperty {
  _awayTeamName: String;
  _code: Number;
  _countryName: String;
  _eventDate: Date;
  _eventDatetimeStamp: Number;
  _eventId: Number;
  _eventType: Number;
  _eventTypeName: String;
  _homeTeamName: String;
  _isFavorite: Boolean;
  _isInCoupon: Boolean;
  _isLiveEvent: Boolean;
  _leagueCode: String;
  _leagueName: String;
  _leaguePriority: Number;
  _bettingPhase: Number;
  _bettingStatus: Number;
  _mbc: Number;
  _detail: Array<any>;
  _eventClosedCombination: Array<any>;
  _eventName: String;
  _eventState: String;
  _eventVersion: Number;
  _sgUniqueId: Number;
}

export default class AllScoresProperty implements IAllScoreProperty {
  constructor(event) {
    this.setPropertyValues(event);
  }

  public _awayTeamName;
  public _code;
  public _countryName;
  public _eventDate;
  public _eventDatetimeStamp;
  public _eventId;
  public _eventType;
  public _eventTypeName;
  public _homeTeamName;
  public _isFavorite;
  public _isInCoupon;
  public _isLiveEvent;
  public _leagueCode;
  public _leagueName;
  public _leaguePriority;
  public _mbc;
  public _sgUniqueId;
  public _eventVersion;
  public _eventState;
  public _detail: Array<Object> = [];
  public _bettingPhase;
  public _bettingStatus;
  public _eventClosedCombination = [];
  public _eventName;

  public setPropertyValues(event) {
    this._awayTeamName = event.awayTeamName;
    this._code = event.code;
    this._countryName = event.countryName;
    this._eventDatetimeStamp = event.eventDatetimeStamp;
    this._eventId = event.eventId;
    this._eventType = event.eventType;
    this._eventTypeName = event.eventTypeName;
    this._homeTeamName = event.homeTeamName;
    this._isFavorite = event.isFavorite;
    this._isInCoupon = event.isInCoupon;
    this._isLiveEvent = event.isLiveEvent;
    this._leagueCode = event.leagueCode;
    this._leagueName = event.leagueName;
    this._leaguePriority = event.leaguePriority;
    this._mbc = event.mbc;

    // event.detail.forEach((item) => {
    //   this.detail.push(new MatchDetailpProperty(item));
    // });
  }
}

class MatchDetailpProperty {
  constructor(part) {
    this.setPropertyValues(part);
  }

  public _away_score;
  public _created_at;
  public _deleted_at;
  public _event_id;
  public _home_score;
  public _id;
  public _part_number;
  public _is_cancelled;
  public _revision;
  public _part_score;
  public _type_no;
  public _score_result;
  public _updated_at;

  public setPropertyValues(part) {
    this._away_score = part.away_score;
    this._created_at = part.created_at;
    this._deleted_at = part.deleted_at;
    this._event_id = part.event_id;
    this._home_score = part.home_score;
    this._id = part.id;
    this._part_number = part.part_number;
    this._is_cancelled = part.is_cancelled;
    this._revision = part.revision;
    this._type_no = part.type_no;
    this._score_result = part.score_result;
    this._updated_at = part.updated_at;
    this._part_score = part.part_score;
  }
}
