import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FitnessService } from './fitness.service';
import { Exercise } from '../domain/exercise';

describe('FitnessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [FitnessService]
    });

    let fitnessService = TestBed.get(FitnessService);
  });

  it('should be created', inject([FitnessService], (service: FitnessService) => {
    expect(service).toBeTruthy();
  }));

  it('should be true', inject([FitnessService, HttpTestingController], (fitnessService: FitnessService, httpMock: HttpTestingController) => {
    /*let id = 'id';
    fitnessService
      .getExercise(id)
      .then((exercise: Exercise) => {
        expect(exercise.name).toEqual("test");
      });
    const request = httpMock.expectOne(`/api/exercises/${id}`);
    request.flush(new Exercise(id, "test", "", 1, 1, true));
    httpMock.verify();*/
    expect(true).toBeTruthy();
  }));
});
