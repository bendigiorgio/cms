export class TypeGenerator {
  generate(schema: any): string {
    if (schema._type !== "schema") {
      throw new Error("The provided schema must be of type 'schema'");
    }

    return this.generateFieldTypes(schema.objectShape);
  }

  private generateFieldTypes(field: any): string {
    let typeDef = "";

    for (let [fieldName, fieldValue] of Object.entries(field)) {
      switch (fieldValue._type) {
        case "string":
        case "richText":
          typeDef += `${fieldName}: string;\n`;
          break;
        case "number":
          typeDef += `${fieldName}: number;\n`;
          break;
        case "boolean":
          typeDef += `${fieldName}: boolean;\n`;
          break;
        case "array":
          // Check if there's a relation to another type
          if (fieldValue._relations && fieldValue._relations.length > 0) {
            const relatedType = fieldValue._relations[0]; // Assuming one relation for simplicity
            typeDef += `${fieldName}: ${relatedType}[];\n`;
          } else {
            typeDef += `${fieldName}: any[];\n`;
          }
          break;
        case "object":
          typeDef += `${fieldName}: {\n${this.generateFieldTypes(
            fieldValue.objectShape
          )}\n};\n`;
          break;
      }
    }

    return typeDef;
  }
}
