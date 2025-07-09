// Ühtsed hinnaplaanid kõigile komponentidele - ainult võtmed, tekstid tulevad i18n-st
export const plans = [
  {
    key: 'free',
    features: [
      'businessDescription',
      'additionalDetails', 
      'address',
      'phone',
      'website',
      'emailAddress'
    ]
  },
  {
    key: 'capitalPremium',
    features: [
      'blogs',
      'events',
      'jobs',
      'newsFeeds',
      'businessDescription',
      'additionalDetails',
      'address',
      'phone',
      'website',
      'emailAddress',
      'featuredImage',
      'teams',
      'googleMapConfiguration',
      'reviews',
      'googleReviews',
      'businessHourConfigurations',
      'video',
      'googlePlaceImages',
      'companyLogo',
      'extraLinks',
      'socialMedia',
      'featuredBlogArticle',
      'onlineVisibilityReport',
      'googleBusinessProfileOptimization',
      'aiSocialPosts',
      'aiVideos'
    ]
  },
  {
    key: 'goldenPremium',
    features: [
      'blogs',
      'events',
      'jobs',
      'newsFeeds',
      'businessDescription',
      'address',
      'phone',
      'website',
      'emailAddress',
      'featuredImage',
      'teams',
      'googleMapConfiguration',
      'reviews',
      'googleReviews',
      'businessHourConfigurations',
      'companyLogo'
    ]
  }
];

export const getPlanByKey = (key) => {
  return plans.find(plan => plan.key === key);
}; 