import Foundation
import Publish
import Plot

// This type acts as the configuration for your website.
struct AdriansCooking: Website {

    enum SectionID: String, WebsiteSectionID {
        // Add the sections that you want your website to contain here:
        case recipes
        case ingredients
        case knowledge

    }

    struct ItemMetadata: WebsiteItemMetadata {
        // Add any site-specific metadata that you want to use here.
    }

    var url = URL(string: "https://adrians.cooking")!
    var name = "Adrian’s Cooking"
    var description = "A collection of Adrian's recipes"
    var language: Language { .english }
    var imagePath: Path? { nil }
    var favicon: Favicon? { .init(path: "images/favicon.svg", type: "image/svg+xml") }

}


/// The following .publish(using:) is a verbatim wayy of this code,
/*try AdriansCooking().publish(
    withTheme: .cooking,
    deployedUsing: .gitHub("afoeder/adrians-cooking", branch: "pages")
)*/
///…in order to allow .generateHTML to be used in the .standAloneFiles mode.

try AdriansCooking().publish(using: [
    .group([].map(PublishingStep.installPlugin)),
    .copyResources(),
    .optional(.copyResources(at: "Content/ingredients/photos", to: "ingredients", includingFolder: true)),
    .optional(.copyResources(at: "Content/recipes/photos", to: "recipes", includingFolder: true)),
    .addMarkdownFiles(),
    .sortItems(by: \.date, order: .descending),
    .group([]),
    .generateHTML(withTheme: .cooking, fileMode: .standAloneFiles),
    ///skip these steps since they don't properly support the ".standAloneFiles" mode, i.e. they don't create links with .html
    /*
     .unwrap(RSSFeedConfiguration.default) { config in
        .generateRSSFeed(
            including: Set(AdriansCooking.SectionID.allCases),
            config: config
        )
    },
    .generateSiteMap(),*/
    .unwrap(.gitHub("afoeder/adrians-cooking", branch: "pages"), PublishingStep.deploy)
])
