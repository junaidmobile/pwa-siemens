export class TrackNTrace {
  PONO: any;
  InvoiceNO: any;
  JobRefNo: any;
  MAWBNO: any;
  UCRNO: any;
  perSupplier: any;
  BENo: any;
  perOriginAirport: any;
  perTransit: any;
  perDestinationAirport: any;
  perAirportTerminal: any;
  perCustoms: any;
  perWareHouse: any;
  perConsignee: any;
  Type: any;

  HOUSENO: any ='';
  supplierMileStones: any;
  originAirportMileStones: any;
  transitMileStones: any;
  destinationAirportMileStones: any;
  airportTerminalMileStones: any;
  customMileStones: any;
  warehouseMileStones: any;
  consigneeMileStones: any;


  constructor() {
    this.HOUSENO ='';
    this.supplierMileStones = '';
    this.originAirportMileStones = '';
    this.transitMileStones = '';
    this.destinationAirportMileStones = '';
    this.airportTerminalMileStones = '';
    this.customMileStones = '';
    this.warehouseMileStones = '';
    this.consigneeMileStones = '';
    this.Type = '0';

  }
}
export class TrackNTraceMSList {
  mileStones: Array<TrackNTraceMileStone>;
}

export class TrackNTraceMileStone {
  MileStoneName: any;
  MileStoneValue: any;
}
