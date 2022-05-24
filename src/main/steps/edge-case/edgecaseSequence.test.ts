import {edgecaseSequence} from './edgecaseSequence'
import {
  ADOPTION_APPLICATION_TYPE,
  CITIZEN_HOME_URL,

  FULL_NAME,

  SERVICE_TYPE,

} from '../urls';



describe('Sequence must match respective path', () => {
  test('should contain 12 entries in applicant 1 screen sequence', () => {
  
    //FullName 
    expect(edgecaseSequence[0].url).toBe(FULL_NAME)

    //CitizenURL
    expect(edgecaseSequence[1].url).toBe(CITIZEN_HOME_URL) 

    //CitizenURL
    expect(edgecaseSequence[2].url).toBe(SERVICE_TYPE) 

    //ADOPTION_APPLICATION_TYPE
    expect(edgecaseSequence[3].url).toBe(ADOPTION_APPLICATION_TYPE) 


    expect(edgecaseSequence.map(item => item.hasOwnProperty('getNextStep')).every(i => true)).toBe(true);
    expect(edgecaseSequence.map(item => item.hasOwnProperty('url')).every(i => true)).toBe(true);
  });
});
