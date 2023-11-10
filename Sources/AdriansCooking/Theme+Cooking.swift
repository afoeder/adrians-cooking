import Plot
import Publish

extension Theme where Site == AdriansCooking {
    
    static var cooking: Self {
        Theme(
            htmlFactory: CookingHtmlFactory(),
            resourcePaths: [
                "CNAME",
                //"Resources/CookingTheme/Styles.css",
                //"Resources/CookingTheme/CrimsonPro-v24-latin-regular.woff2",
                //"Resources/CookingTheme/CrimsonPro-v24-latin-700.woff2",
            ])
}

    private struct CookingHtmlFactory<Site: Website>: HTMLFactory {

        func makeIndexHTML(for index: Publish.Index, context: Publish.PublishingContext<Site>) throws -> Plot.HTML {

            HTML(
                .lang(context.site.language),
                .head(for: index, on: context.site),
                .body {
                    SiteHeader(context: context, selectedSelectionID: nil)
                    
                    Main {
                        H1(index.title)
                        Paragraph(context.site.description)
                            .class("description")
                        
                        Node.section(.component(ComponentGroup {
                            H2("Latest recipes")
                            ItemList(
                                items: context.allItems(
                                    sortedBy: \.date,
                                    order: .descending
                                ).filter { item in
                                    return item.sectionID.rawValue == AdriansCooking.SectionID.recipes.rawValue
                                },
                                site: context.site
                            )
                        }))

                        Node.section(.component(ComponentGroup {
                            H2("General ingredients")
                            ItemList(
                                items: context.allItems(
                                    sortedBy: \.date,
                                    order: .descending
                                ).filter { item in
                                    return item.sectionID.rawValue == AdriansCooking.SectionID.ingredients.rawValue
                                },
                                site: context.site
                            )
                            
                        }))

                    }

                    SiteFooter()
                }
            )
        }

        func makeSectionHTML(for section: Publish.Section<Site>, context: Publish.PublishingContext<Site>) throws -> Plot.HTML {
            
            HTML(
                .lang(context.site.language),
                .head(for: section, on: context.site),
                .body {
                    SiteHeader(context: context, selectedSelectionID: section.id)
                    Main {
                        H1(section.title)
                        ItemList(items: section.items, site: context.site)
                    }
                    SiteFooter()
                }
            )
        }

        func makeItemHTML(for item: Publish.Item<Site>, context: Publish.PublishingContext<Site>) throws -> Plot.HTML {
            
            HTML(
                .lang(context.site.language),
                .head(for: item, on: context.site),
                .body(
                    .class("item-page"),
                    .components {
                        SiteHeader(context: context, selectedSelectionID: item.sectionID)
                        Main {
                            Article {
                                item.content.body

                                if (item.tags.count > 0) {
                                    Footer {
                                        Span("tagged with: ").style("font-style: italic")
                                        ItemTagList(item: item, site: context.site)
                                    }
                                }
                            }
                        }
                        SiteFooter()
                    }
                )
            )
        }

        func makePageHTML(for page: Publish.Page, context: Publish.PublishingContext<Site>) throws -> Plot.HTML {
            
            HTML(
                .lang(context.site.language),
                .head(for: page, on: context.site),
                .body {
                    SiteHeader(context: context, selectedSelectionID: nil)
                    Main(page.body)
                    SiteFooter()
                }
            )
        }

        func makeTagListHTML(for page: Publish.TagListPage, context: Publish.PublishingContext<Site>) throws -> Plot.HTML? {
            
            HTML(
                .lang(context.site.language),
                .head(for: page, on: context.site),
                .body {
                    SiteHeader(context: context, selectedSelectionID: nil)
                    Main {
                        H1("Browse all tags")
                        List(page.tags.sorted()) { tag in
                            ListItem {
                                Link(tag.string,
                                     url: context.site.path(for: tag).absoluteString
                                )
                            }
                            .class("tag")
                        }
                        .class("all-tags")
                    }
                    SiteFooter()
                }
            )
        }

        func makeTagDetailsHTML(for page: Publish.TagDetailsPage, context: Publish.PublishingContext<Site>) throws -> Plot.HTML? {
            
            HTML(
                .lang(context.site.language),
                .head(for: page, on: context.site),
                .body {
                    SiteHeader(context: context, selectedSelectionID: nil)
                    Main {
                        H1 {
                            Text("Tagged with ")
                            Span(page.tag.string).class("tag")
                        }

                        Link("Browse all tags",
                            url: context.site.tagListPath.absoluteString
                        )
                        .class("browse-all")

                        ItemList(
                            items: context.items(
                                taggedWith: page.tag,
                                sortedBy: \.date,
                                order: .descending
                            ),
                            site: context.site
                        )
                    }
                    SiteFooter()
                }
            )
        }

        private struct Wrapper: ComponentContainer {
            @ComponentBuilder var content: ContentProvider

            var body: Component {
                Div(content: content).class("wrapper")
            }
        }

        private struct SiteHeader<Site: Website>: Component {
            var context: PublishingContext<Site>
            var selectedSelectionID: Site.SectionID?

            var body: Component {
                Header {

                    Link(context.site.name, url: "/")
                        .class("site-name")

                    if Site.SectionID.allCases.count > 1 {
                        navigation
                    }

                }
            }

            private var navigation: Component {
                Navigation {
                    List(Site.SectionID.allCases) { sectionID in
                        let section = context.sections[sectionID]

                        return Link(section.title,
                                    url: section.path.absoluteString
                        )
                        .class(sectionID == selectedSelectionID ? "selected" : "")
                    }
                }
            }
        }

        private struct ItemList<Site: Website>: Component {
            var items: [Item<Site>]
            var site: Site

            var body: Component {
                List(items) { item in
                    Article {
                        H1(Link(item.title, url: item.path.withHtmlExtension))
                        ItemTagList(item: item, site: site)
                        
                        if (!item.description.isEmpty) {
                            Paragraph(item.description)
                        }
                    }
                }
                .class("item-list")
            }
        }

        private struct ItemTagList<Site: Website>: Component {
            var item: Item<Site>
            var site: Site

            var body: Component {
                List(item.tags) { tag in
                    Link(tag.string, url: site.path(for: tag).withHtmlExtension)
                }
                .class("tag-list")
            }
        }

        private struct SiteFooter: Component {
            var body: Component {
                Footer {
                    Paragraph {
                        Text("Generated using ")
                        Link("Publish", url: "https://github.com/johnsundell/publish")
                        Text(" // ")
                        Text("Find this ")
                        Link("page on GitHub", url: "https://github.com/afoeder/adrians-cooking")
                        Text(" // ")
                        Link("About / Licenses", url: "/about.html")
                    }
                    /*Paragraph {
                        Link("RSS feed", url: "/feed.rss")
                    }*/
                }
            }
        }
    }

}

internal extension Path {
    var withHtmlExtension: String {
        return
            self.absoluteString.appending(".html")
    }
}
