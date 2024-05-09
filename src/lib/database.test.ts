import assert from "node:assert";
import { describe, it } from "node:test";
import { IDatabase } from "./database.interface.js";

class MockDatabase implements IDatabase {
  async getImageKeyByName() {
    return Promise.resolve({ image_key: "mock_image_key" });
  }
}

describe("an instance of MockDatabase", () => {
  it("should provide a method to a get image key by name", async () => {
    const instance = new MockDatabase();
    const image = await instance.getImageKeyByName();

    assert.strictEqual(image.image_key, "mock_image_key");
  });
});
