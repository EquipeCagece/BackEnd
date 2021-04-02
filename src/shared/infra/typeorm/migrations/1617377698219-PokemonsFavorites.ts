import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class PokemonsFavorites1617377698219
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'favorites',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'pokemon_id',
            type: 'integer',
          },
          {
            name: 'favorite_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'FavoritePokemon',
            columnNames: ['favorite_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('favorites');
  }
}
