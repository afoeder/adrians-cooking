import Foundation
import Publish
import Plot

// This type acts as the configuration for your website.
struct AdriansCooking: Website {

    enum SectionID: String, WebsiteSectionID {
        // Add the sections that you want your website to contain here:
        case recipes
        case ingredients

    }

    struct ItemMetadata: WebsiteItemMetadata {
        // Add any site-specific metadata that you want to use here.
    }

    var url = URL(string: "https://adrians.cooking")!
    var name = "Adrian's Cooking"
    var description = "A collection of Adrian's recipes"
    var language: Language { .english }
    var imagePath: Path? { nil }
}

// This will generate your website using the built-in Foundation theme:
try AdriansCooking().publish(
    withTheme: .cooking,
    deployedUsing: .gitHub("afoeder/adrians-cooking", branch: "pages")
)
