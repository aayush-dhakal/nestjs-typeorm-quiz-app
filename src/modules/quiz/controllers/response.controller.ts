import { Controller, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';
import { events } from '../../../common/constants/event.constants';
import { ResponseAddEvent } from '../events/response-add.event';

@ApiTags('Response')
@Controller('/response')
export class ResponseController {
  constructor(private eventEmitter: EventEmitter2) {}

  @Post('')
  async handleQuestionResponse() {
    // insert data into the response table
    console.log('This is inside the controller');

    // this.eventEmitter.emit(events.RESPONSE_SUBMITTED, {
    //   userId: 1,
    //   optionId: 33,
    // });

    const payload = new ResponseAddEvent();
    payload.userId = 1;
    payload.optionId = 33;

    this.eventEmitter.emit(events.RESPONSE_SUBMITTED, payload);

    return { message: 'Response taken' };
  }
}
