import type { AlgoliaSearchOptions } from 'vitepress';

export const algoliaSearchOptions: AlgoliaSearchOptions = {
  appId: 'DBZ0G9HBUY',
  apiKey: '00cef480a543003d05d9808110ea5f65',
  indexName: 'charles7c',
  locales: {
    root: {
      placeholder: 'Search',
      translations: {
        button: {
          buttonText: 'Search',
          buttonAriaLabel: 'Search'
        },
        modal: {
          searchBox: {
            resetButtonTitle: 'Clear search query',
            resetButtonAriaLabel: 'Clear search query',
            cancelButtonText: 'Cancel',
            cancelButtonAriaLabel: 'Cancel',
          },
          startScreen: {
            recentSearchesTitle: 'Search History',
            noRecentSearchesText: 'No recent searches',
            saveRecentSearchButtonTitle: 'Save recent search',
            removeRecentSearchButtonTitle: 'Remove recent search',
            favoriteSearchesTitle: 'Favorites',
            removeFavoriteSearchButtonTitle: 'Remove from favorite',
          },
          errorScreen: {
            titleText: 'Error',
            helpText: 'Please try again later',
          },
          footer: {
            selectText: 'Select',
            navigateText: 'Switch',
            closeText: 'Close',
            searchByText: 'Provider'
          },
          noResultsScreen: {
            noResultsText: 'No results found',
            suggestedQueryText: 'Did you mean',
            reportMissingResultsText: 'Report missing results',
            reportMissingResultsLinkText: 'here',
          }
        }
      }
    }
  }
};