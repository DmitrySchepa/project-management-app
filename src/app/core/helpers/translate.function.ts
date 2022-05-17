import { TranslateService } from "@ngx-translate/core";

export const translateText = (key: string, translate: TranslateService) => {
  let translatedText = '';
  translate.get(key).subscribe((res: string) => {
    translatedText = res;
  });
  return translatedText;
}

export const translateParamText = (key: string, translate: TranslateService, param: string) => {
  let translatedText = '';
  translate.get(key, {param: param}).subscribe((res: string) => {
    translatedText = res;
});
  return translatedText;
}
