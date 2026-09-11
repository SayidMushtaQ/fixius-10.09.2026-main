export interface TestDataType {
   id?: number,
   title: string,
   slug: string,
   m2: number,
   image: string,
   posted: string,
   location: {
     region: string;
     distance: string;
   },
   category: string
}

export const testData: TestDataType[] = [ // Nur Testdaten
    {
        id: 1,
        title: 'Komplette Abrissarbeiten von Gebäuden und Strukturen',
        m2: 25,
        slug: 'abriss-25m2-boden-bad-kueche-flur-berlin-30-uid-9981',
        image: '/NewJobPostTest/NewJobTestImg.png',
        posted: 'vor 5 Stunden',
        location: {
            region: 'Berlin',
            distance: '30 Kilometer'
        },
        category: 'Abriss & Entsorgung'
    },
    {
        id: 2,
        title: 'Komplette Abrissarbeiten von Gebäuden und Strukturen',
        m2: 220,
        slug: 'abriss-220m2-bodenanstrich-kueche-bad-flur-berlin-100-uid-9982',
        image: '/NewJobPostTest/NewJobTest2img.png',
        posted: 'vor 10 Stunden',
        location: {
            region: 'Berlin',
            distance: '100 Kilometer'
        },
        category: 'Abriss & Entsorgung'
    },
    {
        id: 3,
        title: 'Komplette Abrissarbeiten von Gebäuden und Strukturen',
        m2: 100,
        slug: 'abriss-100m2-boden-kueche-berlin-uid-9984',
        image: '/NewJobPostTest/NewJobTest3img.png',
        posted: 'vor 17 Stunden',
        location: {
            region: 'Berlin',
            distance: '50 Kilometer'
        },
        category: 'Abriss & Entsorgung'
    },
]
