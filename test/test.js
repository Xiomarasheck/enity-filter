import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;

describe('Testing the transactions service:', () => {
    it('Handles GET request /develop/health', (done) => {
        chai.request(app)
            .get('/develop/health')
            .end((_err, res) => {
                expect(res.body.message).to.equal('Service Working.');
                done();
            });
    });
});