export const invType = [
    {id:"paint", dimensions: ["Vendor","Color","Sheen","Item Number","Notes"]},
    {id:"appliance", dimensions: ["Vendor","Item Number","Purchase Date","Notes"]},
]

export function parseInventoryContent(selectedType: string) {
    // take a Inventory content and turn it into fields
    const selectedItem = invType.find(type => selectedType === type.id)
    
    return selectedItem
} 

export function displayInventoryContent(content: string) {
    // take inputs and convert to a Inventory content
    const fields = JSON.parse(content)
    const response = fields?.map((field: any,index: number) => <div className="flex gap-2 mb-1" key={index}><span className="badge badge-neutral">{field.name}</span><span>{field.value}</span></div>)
    return response
} 