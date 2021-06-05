const { ShardingManager } = require('discord.js');
const config = require("./config.json")

const manager = new ShardingManager('./index.js', {
    totalShards: 'auto', 
    token: config.token
});

manager.spawn();

manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));
