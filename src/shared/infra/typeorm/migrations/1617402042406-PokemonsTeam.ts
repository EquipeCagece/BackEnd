import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class PokemonsTeam1617402042406 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'pokemonTeam',
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
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'team_id',
              type: 'uuid',
            },
            {
              name: 'type1',
              type: 'varchar',
            },
            {
              name: 'type2',
              type: 'varchar',
              isNullable: true
            },
          ],
          foreignKeys: [
            {
              name: 'PokemonTeam',
              columnNames: ['team_id'],
              referencedTableName: 'teams',
              referencedColumnNames: ['id'],
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE',
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('pokemonTeam');
    }

}
