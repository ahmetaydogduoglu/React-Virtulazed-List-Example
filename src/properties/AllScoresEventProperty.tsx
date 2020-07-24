interface IAllScoreProperty {
  awayTeamName: String;
  code: Number;
  countryName: String;
  eventDate: Date;
  eventDatetimeStamp: Number;
  eventId: Number;
  eventType: Number;
  eventTypeName: String;
  homeTeamName: String;
  isFavorite: Boolean;
  isInCoupon: Boolean;
  isLiveEvent: Boolean;
  leagueCode: String;
  leagueName: String;
  leaguePriority: Number;
  bettingPhase: Number;
  bettingStatus: Number;
  mbc: Number;
  detail: Array<any>;
  eventClosedCombination: Array<any>;
  eventName: String;
  eventState: String;
  eventVersion: Number;
  sgUniqueId: Number;
}

export default class AllScoresProperty implements IAllScoreProperty {
  constructor(event) {
    this.setPropertyValues(event);
  }

  public awayTeamName;
  public code;
  public countryName;
  public eventDate;
  public eventDatetimeStamp;
  public eventId;
  public eventType;
  public eventTypeName;
  public homeTeamName;
  public isFavorite;
  public isInCoupon;
  public isLiveEvent;
  public leagueCode;
  public leagueName;
  public leaguePriority;
  public mbc;
  public sgUniqueId;
  public eventVersion;
  public eventState;
  public detail: Array<Object>  = [];
  public bettingPhase;
  public bettingStatus;
  public eventClosedCombination= [];
  public eventName;

  public setPropertyValues(event) {
    this.awayTeamName = event.awayTeamName;
    this.code = event.code;
    this.countryName = event.countryName;
    this.eventDatetimeStamp = event.eventDatetimeStamp;
    this.eventId = event.eventId;
    this.eventType = event.eventType;
    this.eventTypeName = event.eventTypeName;
    this.homeTeamName = event.homeTeamName;
    this.isFavorite = event.isFavorite;
    this.isInCoupon = event.isInCoupon;
    this.isLiveEvent = event.isLiveEvent;
    this.leagueCode = event.leagueCode;
    this.leagueName = event.leagueName;
    this.leaguePriority = event.leaguePriority;
    this.mbc = event.mbc;

    // event.detail.forEach((item) => {
    //   this.detail.push(new MatchDetailpProperty(item));
    // });
  }
}

class MatchDetailpProperty {
  constructor(part) {
    this.setPropertyValues(part);
  }

  public away_score;
  public created_at;
  public deleted_at;
  public event_id;
  public home_score;
  public id;
  public part_number;
  public is_cancelled;
  public revision;
  public part_score;
  public type_no;
  public score_result;
  public updated_at;

  public setPropertyValues(part) {
    this.away_score = part.away_score;
    this.created_at = part.created_at;
    this.deleted_at = part.deleted_at;
    this.event_id = part.event_id;
    this.home_score = part.home_score;
    this.id = part.id;
    this.part_number = part.part_number;
    this.is_cancelled = part.is_cancelled;
    this.revision = part.revision;
    this.type_no = part.type_no;
    this.score_result = part.score_result;
    this.updated_at = part.updated_at;
    this.part_score = part.part_score;
  }
}
