interface ILiveEventProprty {
  awayScore: String;
  awayTeamName: String;
  code: Number;
  countryName: String;
  eventDate: Date;
  eventDatetimeStamp: Number;
  eventId: Number;
  eventType: Number;
  eventTypeName: String;
  homeScore: String;
  homeTeamName: String;
  id: Number;
  isFavorite: Boolean;
  isInCoupon: Boolean;
  isLiveEvent: Boolean;
  leagueCode: String;
  leagueName: String;
  leaguePriority: Number;
  mbc: Number;
  parts: Array<Object>;
  playTime: Number;
  score: String;
  status: String;
  statusCode: Number;
}

export default class LiveEventProperty implements ILiveEventProprty {
  constructor(event) {
    this.setPropertyValues(event);
  }

  public awayScore;
  public awayTeamName;
  public code;
  public countryName;
  public eventDate;
  public eventDatetimeStamp;
  public eventId;
  public eventType;
  public eventTypeName;
  public homeScore;
  public homeTeamName;
  public id;
  public isFavorite;
  public isInCoupon;
  public isLiveEvent;
  public leagueCode;
  public leagueName;
  public leaguePriority;
  public mbc;
  public parts: Array<Object> = [];
  public playTime;
  public score;
  public status;
  public publicstatusCode;
  public statusCode;
  public setPropertyValues(event) {
    this.awayScore = event.awayScore;
    this.awayTeamName = event.awayTeamName;
    this.code = event.code;
    this.countryName = event.countryName;
    this.eventDatetimeStamp = event.eventDatetimeStamp;
    this.eventId = event.eventId;
    this.eventType = event.eventType;
    this.eventTypeName = event.eventTypeName;
    this.homeScore = event.homeScore;
    this.homeTeamName = event.homeTeamName;
    this.id = event.id;
    this.isFavorite = event.isFavorite;
    this.isInCoupon = event.isInCoupon;
    this.isLiveEvent = event.isLiveEvent;
    this.leagueCode = event.leagueCode;
    this.leagueName = event.leagueName;
    this.leaguePriority = event.leaguePriority;
    this.mbc = event.mbc;
    event.parts.map((item) => {
      this.parts.push(new MatchPartProperties(item));
    });
    this.playTime = event.playTime;
    this.score = event.score;
    this.status = event.status;
    this.statusCode = event.statusCode;
  }
}

class MatchPartProperties {
  constructor(part) {
    this.setPropertyValues(part);
  }

  public awayScore = null;
  public homeScore = null;
  public part = undefined;
  public score = undefined;

  public setPropertyValues(part) {
    this.awayScore = part.awayScore;
    this.homeScore = part.homeScore;
    this.part = part.part;
    this.score = part.score;
  }
}
