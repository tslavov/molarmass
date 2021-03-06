'use strict';

var assert = require('assert');
var table = require('../lib/table');
var Compound = require('../lib/compound');

describe('compound', function () {
    describe('validation of parentheses', function () {
        it('should throw for unbalanced parentheses', function () {
            assert.throws(function () { new Compound('((A'); });
            assert.throws(function () { new Compound('A))'); });
            assert.throws(function () { new Compound('((A)B)C)'); });
            assert.throws(function () { new Compound('(A)B)'); });
            assert.throws(function () { new Compound('(A)(B'); });
        });

        it('should not throw for balanced parentheses', function () {
            assert.doesNotThrow(function () { new Compound('(A)'); });
        });
    })

    describe('valid compounds', function () {
        it('should parse H', function () {
            var Hydrogen = {
                name: 'Hydrogen',
                symbol: 'H',
                atomicNumber: 1,
                mass: 1.00794
            };

            var H = new Compound('H');

            assert.deepEqual(Hydrogen, H.elements[0].element);
            assert.equal(1, H.elements[0].quantity);
            assert.equal(1.00794, H.molarMass);
        });

        it('should parse OH', function () {
            var OH = new Compound('OH');

            var H = table.get('H');
            var O = table.get('O');

            assert.deepEqual(H, OH.elements[0].element);
            assert.deepEqual(O, OH.elements[1].element);
            assert.equal(1, OH.elements[0].quantity);
            assert.equal(1, OH.elements[1].quantity);
            assert.equal(17.00734, OH.molarMass);
        });

        it('should parse H2', function () {
            var H2 = new Compound('H2');

            var H = table.get('H');

            assert.deepEqual(H, H2.elements[0].element);
            assert.equal(2, H2.elements[0].quantity);
            assert.equal(2.01588, H2.molarMass);
        });

        it('should parse (S8)', function () {
            var S8 = new Compound('(S8)');

            var S = table.get('S');

            assert.deepEqual(S, S8.elements[0].element);
            assert.equal(8, S8.elements[0].quantity);

            assert.equal(256.52, S8.molarMass);
        });

        it('should parse H2O', function () {
            var H2O = new Compound('H2O');

            var H = table.get('H');
            var O = table.get('O');

            assert.deepEqual(H, H2O.elements[0].element);
            assert.equal(2, H2O.elements[0].quantity);

            assert.deepEqual(O, H2O.elements[1].element);
            assert.equal(1, H2O.elements[1].quantity);

            assert.equal(18.01528, H2O.molarMass);
        });

        it('should parse C12H22O11', function () {
            var C12H22O11 = new Compound('C12H22O11');

            var H = table.get('H');
            var C = table.get('C');
            var O = table.get('O');

            assert.deepEqual(H, C12H22O11.elements[0].element);
            assert.equal(22, C12H22O11.elements[0].quantity);

            assert.deepEqual(C, C12H22O11.elements[1].element);
            assert.equal(12, C12H22O11.elements[1].quantity);

            assert.deepEqual(O, C12H22O11.elements[2].element);
            assert.equal(11, C12H22O11.elements[2].quantity);

            assert.equal(342.29648, C12H22O11.molarMass);
        });

        it('should parse H(CO)(CHOH)5H', function () {
          var cmpd = new Compound('H(CO)(CHOH)5H');

          var H = table.get('H');
          var C = table.get('C');
          var O = table.get('O');

          assert.deepEqual(H, cmpd.elements[0].element);
          assert.equal(12, cmpd.elements[0].quantity);

          assert.deepEqual(C, cmpd.elements[1].element);
          assert.equal(6, cmpd.elements[1].quantity);

          assert.deepEqual(O, cmpd.elements[2].element);
          assert.equal(6, cmpd.elements[2].quantity);

          assert.equal(180.15588, cmpd.molarMass);
        })

        it('should parse Na', function () {
            var Sodium = {
                name: 'Sodium',
                symbol: 'Na',
                atomicNumber: 11,
                mass: 22.98977
            };

            var Na = new Compound('Na');

            assert.deepEqual(Sodium, Na.elements[0].element);
            assert.equal(1, Na.elements[0].quantity);
            assert.equal(22.98977, Na.molarMass);
        });

        it('should parse NaOH', function () {
            var NaOH = new Compound('NaOH');

            var H = table.get('H');
            var O = table.get('O');
            var Na = table.get('Na');

            assert.deepEqual(H, NaOH.elements[0].element);
            assert.equal(1, NaOH.elements[0].quantity);

            assert.deepEqual(O, NaOH.elements[1].element);
            assert.equal(1, NaOH.elements[1].quantity);

            assert.deepEqual(Na, NaOH.elements[2].element);
            assert.equal(1, NaOH.elements[2].quantity);

            assert.equal(39.99711, NaOH.molarMass);
        });

        it('should parse Cr2O7', function () {
            var Cr2O7 = new Compound('Cr2O7');

            var O = table.get('O');
            var Cr = table.get('Cr');

            assert.deepEqual(O, Cr2O7.elements[0].element);
            assert.equal(7, Cr2O7.elements[0].quantity);

            assert.deepEqual(Cr, Cr2O7.elements[1].element);
            assert.equal(2, Cr2O7.elements[1].quantity);

            assert.equal(215.988, Cr2O7.molarMass);
        });

        it('should parse Ca(OH)2', function () {
            var cmpd = new Compound('Ca(OH)2');

            var H = table.get('H');
            var O = table.get('O');
            var Ca = table.get('Ca');

            assert.deepEqual(H, cmpd.elements[0].element);
            assert.equal(2, cmpd.elements[0].quantity);

            assert.deepEqual(O, cmpd.elements[1].element);
            assert.equal(2, cmpd.elements[1].quantity);

            assert.deepEqual(Ca, cmpd.elements[2].element);
            assert.equal(1, cmpd.elements[2].quantity);

            assert.equal(74.09268, cmpd.molarMass);
        });

        it('should parse Mg3(PO4)2', function () {
            var cmpd = new Compound('Mg3(PO4)2');

            var O = table.get('O');
            var Mg = table.get('Mg');
            var P = table.get('P');

            assert.deepEqual(O, cmpd.elements[0].element);
            assert.equal(8, cmpd.elements[0].quantity);

            assert.deepEqual(Mg, cmpd.elements[1].element);
            assert.equal(3, cmpd.elements[1].quantity);

            assert.deepEqual(P, cmpd.elements[2].element);
            assert.equal(2, cmpd.elements[2].quantity);

            assert.equal(262.857722, cmpd.molarMass)
        });

        it('should parse ((((Pt)7)5))', function () {
            var cmpd = new Compound('((((Pt)7)5))');

            var Pt = table.get('Pt');

            assert.deepEqual(Pt, cmpd.elements[0].element);
            assert.equal(35, cmpd.elements[0].quantity);

            assert.equal(6827.73, cmpd.molarMass);
        });

        it('should parse (Fe2)O3', function () {
            var cmpd = new Compound('(Fe2)O3');

            var O = table.get('O');
            var Fe = table.get('Fe');

            assert.deepEqual(O, cmpd.elements[0].element);
            assert.equal(3, cmpd.elements[0].quantity);

            assert.deepEqual(Fe, cmpd.elements[1].element);
            assert.equal(2, cmpd.elements[1].quantity);

            assert.equal(159.6882, cmpd.molarMass);
        });

        it('should parse the molar mass of a complex compound', function () {
          var cmpd = new Compound('CH3(CH2)10C(=O)NH(CH2)3[N+](CH3)(CH3)CH2C([O-])=O');

          var H = table.get('H');
          var C = table.get('C');
          var N = table.get('N');
          var O = table.get('O');

          assert.deepEqual(H, cmpd.elements[0].element);
          assert.equal(38, cmpd.elements[0].quantity);

          assert.deepEqual(C, cmpd.elements[1].element);
          assert.equal(19, cmpd.elements[1].quantity);

          assert.deepEqual(N, cmpd.elements[2].element);
          assert.equal(2, cmpd.elements[2].quantity);

          assert.deepEqual(O, cmpd.elements[3].element);
          assert.equal(3, cmpd.elements[3].quantity);

          assert.equal(342.51662, cmpd.molarMass);
        });

        it('should parse 0 as zero quantity on an element', function () {
            var cmpd = new Compound('H0');

            var H = table.get('H');

            assert.deepEqual(H, cmpd.elements[0].element);
            assert.equal(0, cmpd.elements[0].quantity);

            assert.equal(0, cmpd.molarMass);
        });

        it('should parse 0 as zero quantity on a group', function () {
            var cmpd = new Compound('(OH)0');

            var H = table.get('H');
            var O = table.get('O');

            assert.deepEqual(H, cmpd.elements[0].element);
            assert.equal(0, cmpd.elements[0].quantity);

            assert.deepEqual(O, cmpd.elements[1].element);
            assert.equal(0, cmpd.elements[1].quantity);

            assert.equal(0, cmpd.molarMass);
        });

        it('should treat square brackets the same as parenthases', function () {
            var cmpd = new Compound('NH4[Cr(SCN)4(NH3)2]');

            var H = table.get('H');
            var C = table.get('C');
            var N = table.get('N');
            var S = table.get('S');
            var Cr = table.get('Cr');

            assert.deepEqual(H, cmpd.elements[0].element);
            assert.equal(10, cmpd.elements[0].quantity);

            assert.deepEqual(C, cmpd.elements[1].element);
            assert.equal(4, cmpd.elements[1].quantity);

            assert.deepEqual(N, cmpd.elements[2].element);
            assert.equal(7, cmpd.elements[2].quantity);

            assert.deepEqual(S, cmpd.elements[3].element);
            assert.equal(4, cmpd.elements[3].quantity);

            assert.deepEqual(Cr, cmpd.elements[4].element);
            assert.equal(1, cmpd.elements[4].quantity);

            assert.equal(336.4252, cmpd.molarMass);
        });

        it('should allow and ignore underscore characters', function () {
            var cmpd = new Compound('(CH_3)_2CHOH');

            var H = table.get('H');
            var C = table.get('C');
            var O = table.get('O');

            assert.deepEqual(H, cmpd.elements[0].element);
            assert.equal(8, cmpd.elements[0].quantity);

            assert.deepEqual(C, cmpd.elements[1].element);
            assert.equal(3, cmpd.elements[1].quantity);

            assert.deepEqual(O, cmpd.elements[2].element);
            assert.equal(1, cmpd.elements[2].quantity);

            assert.equal(60.09502, cmpd.molarMass);
        });
        it('should allow and ignore the equal sign (=)', function () {
          var cmpd = new Compound('CH3CH2C(=O)OH');

          var H = table.get('H');
          var C = table.get('C');
          var O = table.get('O');

          assert.deepEqual(H, cmpd.elements[0].element);
          assert.equal(6, cmpd.elements[0].quantity);

          assert.deepEqual(C, cmpd.elements[1].element);
          assert.equal(3, cmpd.elements[1].quantity);

          assert.deepEqual(O, cmpd.elements[2].element);
          assert.equal(2, cmpd.elements[2].quantity);

          assert.equal(74.07854, cmpd.molarMass);
        });

        it('should allow and ignore the period character (.)',  function () {
            var cmpd = new Compound('AlAsO4.(H2O)8');

            var H = table.get('H');
            var O = table.get('O');
            var Al = table.get('Al');
            var As = table.get('As');

            assert.deepEqual(H, cmpd.elements[0].element);
            assert.equal(16, cmpd.elements[0].quantity);

            assert.deepEqual(O, cmpd.elements[1].element);
            assert.equal(12, cmpd.elements[1].quantity);

            assert.deepEqual(Al, cmpd.elements[2].element);
            assert.equal(1, cmpd.elements[2].quantity);

            assert.deepEqual(As, cmpd.elements[3].element);
            assert.equal(1, cmpd.elements[3].quantity);

            assert.equal(310.022978, cmpd.molarMass);
        });

        it('should allow and ignore white spaces', function () {
            var cmpd = new Compound('CH3 CO O H');

            var H = table.get('H');
            var C = table.get('C');
            var O = table.get('O');

            assert.deepEqual(H, cmpd.elements[0].element);
            assert.equal(4, cmpd.elements[0].quantity);

            assert.deepEqual(C, cmpd.elements[1].element);
            assert.equal(2, cmpd.elements[1].quantity);

            assert.deepEqual(O, cmpd.elements[2].element);
            assert.equal(2, cmpd.elements[2].quantity);

            assert.equal(60.05196, cmpd.molarMass);
        });

        it('should allow and ignore +/- characters', function () {
            var cmpd = new Compound('Cl-');
            var cmpd2 = new Compound('Na+');

            var Cl = table.get('Cl');
            var Na = table.get('Na');

            assert.deepEqual(Cl, cmpd.elements[0].element);
            assert.equal(1, cmpd.elements[0].quantity);

            assert.equal(35.453, cmpd.molarMass);

            assert.deepEqual(Na, cmpd2.elements[0].element);
            assert.equal(1, cmpd2.elements[0].quantity);

            assert.equal(22.98977, cmpd2.molarMass);
        });
    });

    describe('compounds with unknown elements', function () {
        it('should ignore any unknown, yet valid, symbols', function () {
            var cmpd = new Compound('HX2');

            var H = table.get('H');
            var X = {
                name: '',
                symbol: 'X',
                atomicNumber: 0,
                mass: 0
            }

            assert.deepEqual(X, cmpd.elements[0].element);
            assert.equal(2, cmpd.elements[0].quantity);

            assert.deepEqual(H, cmpd.elements[1].element);
            assert.equal(1, cmpd.elements[1].quantity);

            assert.equal(1.00794, cmpd.molarMass);
        })
    });

    describe('invalid compounds', function () {
        describe('failures starting the compound', function () {
            it('should fail when starting with lowercase', function () {
                assert.throws(function () {
                    var c = new Compound('pCH4');
                });
            });

            it('should fail when starting with number', function () {
              assert.throws(function () {
                    var c = new Compound('4(Zn)');
              });
            });

            it('should fail when starting with close parentheses', function () {
                assert.throws(function () {
                    var c = new Compound(')He');
                });
            });
        });

        describe('failures after number', function () {
            it('should fail when followed by lowercase', function () {
                assert.throws(function () {
                    var c = new Compound('C2h4o2');
                });
            });
        });

        describe('failures after open parentheses', function () {
            it('should fail when followed by lowercase', function () {
                assert.throws(function () {
                    var c = new Compound('(k)');
                });
            });

            it('should fail when followed by number', function () {
                assert.throws(function () {
                    var c = new Compound('H2O(2)');
                });
            });

            it('should fail when followed by close parentheses', function () {
                assert.throws(function () {
                    var c = new Compound('Tc()');
                });
            });

            it('should fail when ending with open parentheses', function () {
                assert.throws(function () {
                    var c = new Compound('K2SO4(');
                })
            });
        });

        describe('failures after close parentheses', function () {
            it('should fail when followed by lowercase', function () {
                assert.throws(function () {
                    var c = new Compound('(CH3)cH3')
                })
            });
        });

        describe('failures containing special characters', function () {
            it('should fail when containing any invalid characters', function () {
                assert.throws(function () {
                    var c = new Compound('Cl^2');
                });
            });
        });
    });
});
