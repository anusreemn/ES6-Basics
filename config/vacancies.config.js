export const tableColumns = [
    {
        key: 'title',
        header: 'Job Title',
        dataType: 'string'
    }, {
        key: 'location',
        header: 'Location',
        dataType: 'string'
    }, {
        key: 'description',
        header: 'Requirements',
        downloadUrl: 'apis/description/', //show button to download
        downloadKey: 'poiId'
    }, {
        key: 'status',
        header: 'Position Availability',
        dataType: 'boolean',
        // valueMap: {
        //     0: 'Unavailable',
        //     1: 'Available'
        // },
        showApplyButton: true
    }
]