// swift-tools-version: 5.9

import PackageDescription

let package = Package(
    name: "AdriansCooking",
    platforms: [.macOS(.v12)],
    products: [
        .executable(
            name: "AdriansCooking",
            targets: ["AdriansCooking"]),
    ],
    dependencies: [
        .package(url: "https://github.com/johnsundell/publish.git", from: "0.8.0"),
        .package(url: "https://github.com/JohnSundell/Plot.git", branch: "master"),
    ],
    targets: [
        .executableTarget(
            name: "AdriansCooking",
            dependencies: [
                .product(name: "Publish", package: "publish")
            ]
        )
    ]
)
