import { Injectable } from '@angular/core';
import moment from 'moment';
import { ApprovalStatus, BillPercentage, BillType, Sector } from '../models/constant.config';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private sessionService: SessionService) { }
  public roundValue(value: number, digit: number = 2): number {
    if (value) {
      return parseFloat(value.toFixed(digit));
    }
    return 0;
  }
  addMonths(date: Date, months: number): Date {
    const d = new Date(date);
    const day = d.getDate();

    if (day === 1) {
      // When day is 1: return last day of the month before the target month
      // targetMonthIndex = currentMonth + months
      // new Date(year, targetMonthIndex, 0) => last day of targetMonthIndex-1
      const year = d.getFullYear();
      const targetMonthIndex = d.getMonth() + months; // 0-based months
      return new Date(year, targetMonthIndex, 0);     // last day of previous month
    }

    // otherwise preserve day semantics
    return this.addMonthsPreserveDay(d, months);
  }
  getLastNMonthsEndISO(monthsCount: number): string[] {
    const now = new Date();
    const result: string[] = [];

    for (let i = 1; i <= monthsCount + 1; i++) {
      // 1st day of the month i months ago in UTC
      const firstOfMonthUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i + 1, 1, 0, 0, 0));

      // Subtract 6 hours to get previous day at 18:00 UTC
      firstOfMonthUTC.setUTCHours(firstOfMonthUTC.getUTCHours() - 6);
      if (i != 1)
        result.push(firstOfMonthUTC.toISOString());
    }

    return result;
  }
  getAllFinancialYearMonths(startYear: number): string[] {
    const months: string[] = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(startYear, 3 + i); // 3 = April (0-based)
      const month = date.getMonth() + 1; // 1–12
      const year = date.getFullYear();
      months.push(`${month}-${year}`);
    }
    return months;
  }
  addMonthsPreserveDay(date: Date, months: number): Date {
    const d = new Date(date);               // copy
    const day = d.getDate();                // original day (1..31)
    d.setDate(1);                           // avoid overflow while changing month
    d.setMonth(d.getMonth() + months);      // move to target month (first day)
    const daysInTarget = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    d.setDate(Math.min(day, daysInTarget)); // pick original day or last day if not available
    return d;
  }
  getDaysDifference(startDate: string | Date, endDate: string | Date): number {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const diffTime = Math.abs(end.getTime() - start.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Convert milliseconds to days
    }
    else
      return 0;
  }
  getMonthsDifference(startDate: string | Date, endDate: string | Date): number {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      let months = (end.getFullYear() - start.getFullYear()) * 12;
      months += end.getMonth() - start.getMonth();

      // Optional: Count partial month if days differ
      if (end.getDate() < start.getDate()) {
        months -= 1;
      }

      return months;
    } else {
      return 0;
    }
  }
  toRoman(num: number): string {
    const romans: { [key: number]: string } = {
      1000: 'M', 900: 'CM', 500: 'D', 400: 'CD',
      100: 'C', 90: 'XC', 50: 'L', 40: 'XL',
      10: 'X', 9: 'IX', 5: 'V', 4: 'IV',
      1: 'I'
    };
    let result = '';
    for (const value of Object.keys(romans).map(Number).sort((a, b) => b - a)) {
      while (num >= value) {
        result += romans[value];
        num -= value;
      }
    }
    return result;
  }

  costFormatter(value: number): string | number {
    if (value >= 10000000) return value / 10000000 + ' Cr.';
    if (value >= 1000000) return value / 1000000 + ' M';
    if (value >= 1000) return value / 1000 + ' K';
    return value;
  }
  getMonthandYear(data: any) {
    if (data) {
      return { month: moment(data).format('MMMM'), year: moment(data).format('YYYY') };
    }
    return { month: '-', year: '-' };
  }

  convertDateToISO(input: any) {
    // parse as UTC date with the known format
    const parts = input.split('-');
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).toISOString();
  }
  isValidNumber(value: any): boolean {
    return value !== null &&
      value !== undefined &&
      value !== '' &&
      !isNaN(value) &&
      !isNaN(parseFloat(value));
  }
  isRowEmpty(row: any): boolean {
    return Object.values(row).every(value => value === null || value === undefined || value === '');
  }
  getVehicleBillingInfo(data: any) {
    console.log(data);
    let currentKm = +data.currentkm;
    let fixedkm = +data.fixedkm;
    if (currentKm > fixedkm) {
      return {
        extrakm: currentKm - fixedkm + (+data.extrakm),
        totalkm: fixedkm + currentKm,
        amount: data.fixedamount + (((currentKm - fixedkm) + (+data.extrakm)) * data.extraamountperkmafterfixedkm)
      };
    }
    else
      return {
        extrakm: 0 + (+data.extrakm),
        totalkm: fixedkm,
        amount: data.fixedamount + ((+data.extrakm) * data.extraamountperkmafterfixedkm)
      };
  }
  getOverallStatus(levels: any) {
    if (!levels || levels.length === 0) return ApprovalStatus.APPROVED.toString();

    const lastStatus = levels[levels.length - 1].status?.toLowerCase();

    if (lastStatus === ApprovalStatus.APPROVED.toLowerCase()) {
      return ApprovalStatus.APPROVED.toString();
    }

    const hasRejected = levels.some((level: any) => level.status?.toLowerCase() === ApprovalStatus.REJECTED.toLowerCase());
    if (hasRejected) {
      return ApprovalStatus.REJECTED.toString();
    }

    const hasApproved = levels.some((level: any) => level.status?.toLowerCase() === ApprovalStatus.APPROVED.toLowerCase());
    if (hasApproved) {
      return ApprovalStatus.INPROCESS.toString();
    }

    return ApprovalStatus.PENDING.toString();
  }
  capitalizeFirst(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  getLastMonths(count: number): { month: number, year: number }[] {
    const today = new Date();
    const result = [];

    for (let i = 1; i <= count; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      result.push({
        month: date.getMonth() + 1, // +1 because getMonth() is zero-based
        year: date.getFullYear()
      });
    }

    return result;
  }
  getFinancialYearMonths(startYear: number) {
    const result: any[] = [];
    const fyStartMonth = 4; // April

    for (let i = 0; i < 12; i++) {
      const month = ((fyStartMonth + i - 1) % 12) + 1;
      const year = startYear + Math.floor((fyStartMonth + i - 1) / 12);
      result.push({ month, year });
    }
    return result;
  }
  updateBillingSummary(status: string, amount: any, data: any) {
    if (status) {
      const match = data.find(
        (s: any) => s.status.toLowerCase() === status?.toLowerCase()
      );

      if (match) {
        match.totalamount -= amount;
      }
    }
  }
  netPercentage(income: number, expense: number, netGainLoss: number): string {
    if (income === 0) {
      if (expense > 0) {
        return '-100%';
      } else {
        return '0%';
      }
    }
    const percent = (netGainLoss / income) * 100;
    return percent.toFixed(2) + '%';
  }

  getPermissionsForCurrentPage(pageGuid: string): Promise<any> {
    return new Promise((resolve) => {
      this.sessionService.userSubject$.subscribe((response: any) => {
        if (response) {
          const mainmodules: any[] = response.modules?.modules;

          const findPermissions = (modules: any[]): string[] | null => {
            for (let module of modules) {
              if (module.id === pageGuid) {
                return module.permission;
              }
              if (Array.isArray(module.modulelist) && module.modulelist.length) {
                const result = findPermissions(module.modulelist);
                if (result) return result;
              }
            }
            return null;
          };

          const permissions = findPermissions(mainmodules);

          resolve({
            canCreate: permissions?.includes('C') ?? false,
            canRead: permissions?.includes('R') ?? false,
            canUpdate: permissions?.includes('U') ?? false,
            canDelete: permissions?.includes('D') ?? false
          });
        } else {
          resolve({
            canCreate: false,
            canRead: false,
            canUpdate: false,
            canDelete: false
          });
        }
      });
    });
  }

  updateSectorIds(sectors: Sector[], backendSectors: any[]): Sector[] {
    return sectors.map(sec => {
      const backendSec = backendSectors.find(b => b.abbreviation === sec.abbr || b.name === sec.name);

      if (backendSec) {
        sec.id = backendSec.id;

        if (sec.subcategories && backendSec.subsectors) {
          sec.subcategories = sec.subcategories.map(sub => {
            const backendSub = backendSec.subsectors.find(
              (bs: any) => bs.abbreviation === sub.abbr || bs.name === sub.name
            );
            return backendSub ? { ...sub, id: backendSub.id } : sub;
          });
        }
      }
      return sec;
    });
  }
  mapSectors(apiResponse: any, masterVerticals: any[]) {
    return masterVerticals.map(masterSector => {
      const apiSector = apiResponse.sectors.find(
        (s: any) => s.abbreviation === masterSector.name
      );

      if (!apiSector) return null;

      return {
        id: apiSector.id,
        name: apiSector.name,
        abbr: apiSector.abbreviation,
        subcategories: masterSector.subcategories
          .map((sub: any) => {
            const apiSub = apiSector.subsectors.find(
              (apiSub: any) => apiSub.abbreviation === sub.name
            );
            if (!apiSub) return null;

            return {
              id: apiSub.id,
              name: apiSub.name,
              abbr: apiSub.abbreviation,
              component: sub.component
            };
          })
          .filter(Boolean)
      };
    }).filter(Boolean);
  }
  getContractorBillTypePercentage(bill: string): string | undefined {
    const key = (Object.keys(BillType) as Array<keyof typeof BillType>).find(
      (k) => BillType[k].toLowerCase() === bill.toLowerCase()
    ) as keyof typeof BillType | undefined;

    return key ? BillPercentage[key] + "%" : undefined;
  }
  getOfficeRentAmount(amount: number) {
    if (amount && amount > 19999) {
      amount += (amount * 10 / 100);
      return { total: amount, tds: (amount * 10 / 100) };
    }
    return { total: amount, tds: 0 };
  }
}
