const request = require('supertest');
const httpStatus = require('http-status');

const Game = require('../src/models/game');
const app = require('../src/config/express');
const db = require('../src/config/database');

describe('Integration test:', () => {
  beforeAll(async () => {
    db.connect();
    await Game.deleteMany({});
  });

  afterAll(async () => {
    // avoid jest open handle error
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
  });

  describe('GET /api/v1/status', () => {
    it('should return 200 on heartbeat test', (done) => request(app).get('/api/v1/status').expect(200).end(done));
  });

  describe('Game', () => {
    const payload = {
      histories: [
        'X clicked box 0',
        'O clicked box 1',
        'X clicked box 2',
        'O clicked box 3',
        'X clicked box 4',
        'O clicked box 5',
        'X clicked box 6',
      ],
      squares: ['X', 'O', 'X', 'O', 'X', 'O', 'X', null, null],
      xIsNext: false,
    };

    it('POST /api/v1/game should update game state', async () => {
      const res = await request(app)
        .post('/api/v1/game')
        .send(payload)
        .expect(httpStatus.OK);

      expect(res.body.xIsNext).toBe(payload.xIsNext);
      expect(res.body.squares).toEqual(payload.squares);
      expect(res.body.histories).toEqual(payload.histories);
    });
  });
});
