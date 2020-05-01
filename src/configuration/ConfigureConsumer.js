import { connect } from 'amqplib/callback_api'
import config  from 'config'
import {logger} from '.'
class ConfigureConsumer {
    constructor() {
        this._config = config.get('Queue')
        this._ampqUrl = `amqp://${this._config.user}:${this._config.secret}@${this._config.url}`
    }

    configure() {
        const {name, topic } = this._config;
        logger.info('@ConfigureConsumer connecting')
        connect(this._ampqUrl, (err, conn) => {
            if(err) {throw err}
            logger.info('@ConfigureConsumer %s queue connecting', this._ampqUrl)
            conn.createChannel((errCh, channel) => {
                logger.info('@ConfigureConsumer channel created with topic')
                const exchange = topic.image;
                channel.assertExchange(exchange, 'topic', { durable: false } )
                channel.assertQueue(name, { exclusive: true }, (errQ, q) => {
                    if (errQ) { throw errQ; }
                    logger.info('@ConfigureConsumer exchange: %s queue: %s', exchange, name)
                    channel.bindQueue(q.queue, exchange, '#');
                    channel.consume(q.queue, (msg) => {
                        logger.info('@Consumer Request with topic: %s', topic.image)
                    }, { noAck: true  });
                });
            })
        });
    }
}


export default new ConfigureConsumer;