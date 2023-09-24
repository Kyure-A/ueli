type Package = {
    "PackageIdentifier": string,
}

type SourceDetails = {
    "Argument": string,
    "Identifier": string,
    "Name": string,
    "Type": string,
}

type Source = {
    "Packages": Package[],
    "SourceDetails": SourceDetails,
}

export type WingetPackageList = {
    "$schema": string,
    "CreationDate": string,
    "Sources": Source[],
    "WinGetVersion": string,
}
