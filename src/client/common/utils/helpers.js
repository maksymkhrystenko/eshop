import i18next from 'i18next';

export const setLanguage = language => {
  i18next.init({
    lng: language,
    resources: require(`../localizations/${language}.json`)
  });
};
