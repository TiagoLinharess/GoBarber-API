import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await Promise.all(
      Array.from({ length: 10 }, (_, index) =>
        fakeAppointmentsRepository.create({
          date: new Date(2020, 4, 20, index + 8),
          user_id: 'user',
          provider_id: 'provider',
        }),
      ),
    );

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 21, 11),
      user_id: 'user',
      provider_id: 'provider',
    });

    const availability = await listProviderMonthAvailability.execute({
      month: 5,
      year: 2020,
      provider_id: 'provider',
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
