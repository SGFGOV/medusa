//validator = require( '../modules/address/sgf-gstin-validator')
///<reference path = "../types/sgf-gstin-validator.d.ts" />
//import * as validator  from "sgf-gstin-validator"
let validator = require('sgf-gstin-validator')

describe('@IsGstin', function() {


  it('validator.isValidGSTNumber::Should return false when length is not 15 digits',
      function() {
        var result = validator.isValidGSTNumber('123412341234');
        expect(result).toBe(false);
      });
  
    it('validator.isValidGSTNumber::Should return false if 15 digit non regex matching GSTIN is validated', function() {
      var result = validator.isValidGSTNumber('47AAGCG4576J1A6');
      expect(result).toBe(false);
    });
  
    it('validator.isValidGSTNumber::Should return false if 15 digit valid regex matching GSTIN with incorrect checksum is validated', function() {
      var result = validator.isValidGSTNumber('27AAGCG4576J1Z8');
      expect(result).toBe(false);
    });
  
    it('validator.isValidGSTNumber::Should return true if valid 15 digit GSTIN is passed',
      function() {
        // Google India
        var result = validator.isValidGSTNumber('27AAGCG4576J1Z6');
        expect(result).toBe(true);
      });
  
    it('validator.isValidGSTNumber::Should return true for GSTIN of Indian Oil across all states', function() {
      var gstins = [
        '37AAACI1681G2ZN',
        '38AAALS7119L1ZH',
        '35AAACI1681G1ZS',
        '12AAACI1681G1Z0',
        '18AAACI1681G1ZO',
        '10AAACI1681G1Z4',
        '04AAACI1681G1ZX',
        '22AAACI1681G1ZZ',
        '26AAACI1681G1ZR',
        '25AAACI1681G1ZT',
        '07AAACI1681G1ZR',
        '30AAACI1681G1Z2',
        '24AAACI1681G1ZV',
        '06AAACI1681G1ZT',
        '02AAACI1681G3ZZ',
        '01AAACI1681G2Z2',
        '20AAACI1681G3Z1',
        '29AAACI1681G1ZL',
        '32AAACI1681G1ZY',
        '23AAACI1681G1ZX',
        '27AAACI1681G1ZP',
        '14AAACI1681G2ZV',
        '17AAACI1681G1ZQ',
        '15AAACI1681G1ZU',
        '13AAACI1681G1ZY',
        '21AAACI1681G1Z1',
        '34AAACI1681G1ZU',
        '03AAACI1681G1ZZ',
        '08AAACI1681G2ZO',
        '11AAACI1681G1Z2',
        '33AAACI1681G1ZW',
        '36AAACI1681G1ZQ',
        '16AAACI1681G1ZS',
        '09AAACI1681G1ZN',
        '05AAACI1681G1ZV',
        '19AAACI1681G1ZM',
        '06AAACI1681G2ZS',
        '24AAACI1681G2ZU',
      ]; // GSTIN of IOCL across all states
      var success = true;
      for (var gstin in gstins) {
        var result = validator.isValidGSTNumber(gstins[gstin]);
        success = success && result;
      }
      expect(success).toBe(true);
    });}
    )