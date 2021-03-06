/* This file was generated by ODB, object-relational mapping (ORM)
 * compiler for C++.
 */

IF OBJECT_ID('User_id_fk', 'F') IS NOT NULL
  ALTER TABLE [User]
    DROP CONSTRAINT [User_id_fk];
GO

IF OBJECT_ID('User_credentials_fk', 'F') IS NOT NULL
  ALTER TABLE [User]
    DROP CONSTRAINT [User_credentials_fk];
GO

IF OBJECT_ID('User', 'U') IS NOT NULL
  DROP TABLE [User];
GO

CREATE TABLE [User] (
  [id] INT NOT NULL PRIMARY KEY,
  [firstName] VARCHAR(512) NULL,
  [lastName] VARCHAR(512) NULL,
  [credentials] INT NULL);
GO

ALTER TABLE [User]
  ADD CONSTRAINT [User_id_fk]
    FOREIGN KEY ([id])
    REFERENCES [Entity] ([id])
    ON DELETE CASCADE
      /*
      CONSTRAINT [User_credentials_fk]
    FOREIGN KEY ([credentials])
    REFERENCES [Credentials] ([id])
      */;
GO

