import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { map } from "rxjs/operators";

import { IAddMemberToListResponse, IMailchimpOptions } from "./interfaces";
import { MAILCHIMP_OPTIONS_PROVIDER } from "./mailchimp.constants";

@Injectable()
export class MailchimpService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(MAILCHIMP_OPTIONS_PROVIDER)
    private readonly options: IMailchimpOptions,
  ) {}

  public addToContactList(
    listId: string,
    email: string,
    fields: Record<string, string>,
  ): Promise<IAddMemberToListResponse | null> {
    // https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/
    const response = this.httpService
      .request({
        method: "post",
        url: `https://${this.options.dc}.api.mailchimp.com/3.0/lists/${listId}/members/`,
        auth: {
          username: this.options.userName,
          password: this.options.apiKey,
        },
        data: {
          email_address: email,
          status: "subscribed",
          merge_fields: fields,
        },
      })
      .pipe(map((response: { data: IAddMemberToListResponse }) => response.data));

    return firstValueFrom(response).catch(e => {
      this.loggerService.error(e.message, e.stack, MailchimpService.name);
      return null;
    });
  }
}
