/* eslint-disable @typescript-eslint/no-explicit-any */
// export const isDateRangeAvailable = (
//   service: any,
//   startDate: Date,
//   endDate: Date,
// ) => {
//   for (const booking of service.bookings) {
//     if (
//       (startDate >= booking.startDate && startDate <= booking.endDate) ||
//       (endDate >= booking.startDate && endDate <= booking.endDate) ||
//       (startDate <= booking.startDate && endDate >= booking.endDate) ||
//       (startDate >= booking.startDate && endDate <= booking.endDate)
//     ) {
//       return false; // Date range overlaps with an existing booking
//     }
//   }
//   return true; // Date range is available
// };
// export const checkRoomAvailable = async (data: any) => {
//   const alreadyBookedRoomOnDay =
//     await prisma.offeredCourseClassSchedule.findMany({
//       where: {
//         dayOfWeek: data.dayOfWeek,
//         room: {
//           id: data.roomId,
//         },
//       },
//     });

import { Service } from '../app/modules/service/service.model';
import ApiError from '../errors/Apierror';

//   const existingSlots = alreadyBookedRoomOnDay.map(schedule => ({
//     startTime: schedule.startTime,
//     endTime: schedule.endTime,
//     dayOfWeek: schedule.dayOfWeek,
//   }));

//   const newSlot = {
//     startTime: data.startTime,
//     endTime: data.endTime,
//     dayOfWeek: data.dayOfWeek,
//   };

//   if (hasTimeConflict(existingSlots, newSlot)) {
//     throw new ApiError(httpStatus.CONFLICT, 'Room is already booked!');
//   }
// };

// Define a function to check room availability
export const checkRoomAvailable = async (data: any) => {
  // Find rooms that are already booked for the given date range
  const alreadyBookedRooms = await Service.find({
    'bookings.startDate': { $lte: data.endDate },
    'bookings.endDate': { $gte: data.startDate },
  });

  if (alreadyBookedRooms.length > 0) {
    // Handle the case where rooms are already booked for the specified date range
    throw new ApiError(
      400,
      'Rooms are already booked for the specified date range',
    );
  }
};
