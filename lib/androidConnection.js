'use strict';

const adb = require('adbkit');

async function firstConnectedDevice(client) {
  const devices = await client.listDevices();
  return devices[0].id;
}

class AndroidConnection {
  constructor(client, deviceId) {
    this.client = client;
    this.deviceId = deviceId;
  }

  async runCommand(command) {
    return this.client.shell(this.deviceId, command);
  }

  async getFile(pathOnDevice) {
    return this.client.pull(this.deviceId, pathOnDevice);
  }
}

module.exports = {
  async createConnection(deviceId) {
    const client = adb.createClient();
    const id = await (deviceId || firstConnectedDevice(client));

    return new AndroidConnection(client, id);
  }
};