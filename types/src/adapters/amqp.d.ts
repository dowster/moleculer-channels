export = AmqpAdapter;
/**
 * @typedef {import('amqplib').Connection} AMQPLibConnection AMQP connection
 * @typedef {import('amqplib').Channel} AMQPLibChannel AMQP Channel. More info: http://www.squaremobius.net/amqp.node/channel_api.html#channel
 * @typedef {import("moleculer").ServiceBroker} ServiceBroker Moleculer Service Broker instance
 * @typedef {import("moleculer").LoggerInstance} Logger Logger instance
 * @typedef {import("../index").Channel} Channel Base channel definition
 * @typedef {import("./base").BaseDefaultOptions} BaseDefaultOptions Base adapter options
 */
/**
 * @typedef {Object} AmqpDefaultOptions AMQP Adapter configuration
 * @property {Number} maxInFlight Max-in-flight messages
 * @property {Object} amqp AMQP lib configuration
 * @property {String|String[]} amqp.url Connection URI
 * @property {Object} amqp.socketOptions AMQP lib socket configuration
 * @property {Object} amqp.queueOptions AMQP lib queue configuration
 * @property {Object} amqp.exchangeOptions AMQP lib exchange configuration
 * @property {Object} amqp.messageOptions AMQP lib message configuration
 * @property {Object} amqp.consumerOptions AMQP lib consume configuration
 */
/**
 * @typedef {Object} SubscriptionEntry
 * @property {Channel & AmqpDefaultOptions} chan AMQP Channel
 * @property {String} consumerTag AMQP consumer tag. More info: https://www.rabbitmq.com/consumers.html#consumer-tags
 */
/**
 * AMQP adapter for RabbitMQ
 *
 * TODO: rewrite to using RabbitMQ Streams
 * https://www.rabbitmq.com/streams.html
 *
 * @class AmqpAdapter
 * @extends {BaseAdapter}
 */
declare class AmqpAdapter extends BaseAdapter {
    /** @type {AmqpDefaultOptions & BaseDefaultOptions} */
    opts: AmqpDefaultOptions & BaseDefaultOptions;
    /** @type {AMQPLibConnection} */
    connection: any;
    /** @type {AMQPLibChannel} */
    channel: any;
    clients: Map<any, any>;
    /**
     * @type {Map<string,SubscriptionEntry>}
     */
    subscriptions: Map<string, SubscriptionEntry>;
    stopping: boolean;
    connectAttempt: number;
    connectionCount: number;
    /**
     * Connect to the adapter with reconnecting logic
     */
    connect(): Promise<any>;
    /**
     * Trying connect to the adapter.
     */
    tryConnect(): Promise<void>;
    /**
     * Subscribe to a channel.
     *
     * @param {Channel & AmqpDefaultOptions} chan
     */
    subscribe(chan: Channel & AmqpDefaultOptions): Promise<void>;
    /**
     * Create a handler for the consumer.
     *
     * @param {Channel & AmqpDefaultOptions} chan
     * @returns {Function}
     */
    createConsumerHandler(chan: Channel & AmqpDefaultOptions): Function;
    /**
     * Moves message into dead letter
     *
     * @param {Channel & AmqpDefaultOptions} chan
     * @param {Object} msg
     */
    moveToDeadLetter(chan: Channel & AmqpDefaultOptions, msg: any): Promise<void>;
    /**
     * Unsubscribe from a channel.
     *
     * @param {Channel & AmqpDefaultOptions} chan
     */
    unsubscribe(chan: Channel & AmqpDefaultOptions): Promise<void>;
    /**
     * Resubscribe to all channels.
     * @returns {Promise<void>}
     */
    resubscribeAllChannels(): Promise<void>;
    /**
     * Publish a payload to a channel.
     *
     * @param {String} channelName
     * @param {any} payload
     * @param {Object?} opts
     */
    publish(channelName: string, payload: any, opts?: any | null): Promise<void>;
}
declare namespace AmqpAdapter {
    export { AMQPLibConnection, AMQPLibChannel, ServiceBroker, Logger, Channel, BaseDefaultOptions, AmqpDefaultOptions, SubscriptionEntry };
}
import BaseAdapter = require("./base");
/**
 * AMQP Adapter configuration
 */
type AmqpDefaultOptions = {
    /**
     * Max-in-flight messages
     */
    maxInFlight: number;
    /**
     * AMQP lib configuration
     */
    amqp: {
        url: string | string[];
        socketOptions: any;
        queueOptions: any;
        exchangeOptions: any;
        messageOptions: any;
        consumerOptions: any;
    };
};
/**
 * Base adapter options
 */
type BaseDefaultOptions = import("./base").BaseDefaultOptions;
type SubscriptionEntry = {
    /**
     * AMQP Channel
     */
    chan: Channel & AmqpDefaultOptions;
    /**
     * AMQP consumer tag. More info: https://www.rabbitmq.com/consumers.html#consumer-tags
     */
    consumerTag: string;
};
/**
 * Base channel definition
 */
type Channel = import("../index").Channel;
/**
 * AMQP connection
 */
type AMQPLibConnection = any;
/**
 * AMQP Channel. More info: http://www.squaremobius.net/amqp.node/channel_api.html#channel
 */
type AMQPLibChannel = any;
/**
 * Moleculer Service Broker instance
 */
type ServiceBroker = import("moleculer").ServiceBroker;
/**
 * Logger instance
 */
type Logger = import("moleculer").LoggerInstance;
