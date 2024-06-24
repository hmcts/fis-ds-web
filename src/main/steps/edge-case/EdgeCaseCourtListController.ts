import { CourtListOptions } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';

export let courtList: CourtListOptions[] = [];
export class EdgeCaseCourtListController {
  public async getCourtList(req: AppRequest): Promise<void> {
    courtList = await req.locals.api.getCourtList();
  }
}
