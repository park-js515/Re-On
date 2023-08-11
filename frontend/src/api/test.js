import { testInstance } from './lib/index';

function testBoard() {
    const api = testInstance();
      api.get(`/api/member-management/battlelog`).then().catch();
}

export { testBoard };