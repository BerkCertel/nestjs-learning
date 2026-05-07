import { Module } from '@nestjs/common';
import { AvailabilityController } from './availability.controller';
import { AvailabilityService } from './availability.service';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [AvailabilityController],
  providers: [AvailabilityService],
  imports: [AuthService],
})
export class AvailabilityModule {}
