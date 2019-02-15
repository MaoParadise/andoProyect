/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     13-02-2019 14:16:40                          */
/*==============================================================*/


drop table if exists CATEGORY;

drop table if exists CATEGORYMEDIA;

drop table if exists CLASIFICATION;

drop table if exists EMBEDFRAME;

drop table if exists GENERALMETRIC;

drop table if exists MEDIA;

drop table if exists RANKING;

drop table if exists RELATIONSHIP;

drop table if exists STATEMEDIA;

drop table if exists SUPERUSER;

drop table if exists TYPE;

drop table if exists UPLOAD;

drop table if exists USER;

/*==============================================================*/
/* Table: CATEGORY                                              */
/*==============================================================*/
create table CATEGORY
(
   IDCATEGORY           int not null,
   NAMECATEGORY         varchar(50),
   DESCRIPTIONCATEGORY  varchar(225),
   primary key (IDCATEGORY)
);

/*==============================================================*/
/* Table: CATEGORYMEDIA                                         */
/*==============================================================*/
create table CATEGORYMEDIA
(
   IDMEDIA              int not null,
   IDCATEGORY           int not null,
   primary key (IDMEDIA, IDCATEGORY)
);

/*==============================================================*/
/* Table: CLASIFICATION                                         */
/*==============================================================*/
create table CLASIFICATION
(
   IDCLASIFICATION      int not null auto_increment,
   NAMECLASIFICATION    varchar(50),
   DESCRIPTIONCLASIFICATION varchar(225),
   CLASIFICATION        varchar(50),
   primary key (IDCLASIFICATION)
);

/*==============================================================*/
/* Table: EMBEDFRAME                                            */
/*==============================================================*/
create table EMBEDFRAME
(
   IDFRAME              int not null auto_increment,
   IDMEDIA              int,
   EMAIL                varchar(80),
   NUMBEREPISODE        varchar(4),
   EMBEDFRAME           varchar(650),
   URLFRAME             varchar(225),
   QUALITY              varchar(15),
   STATEFRAME           bool,
   primary key (IDFRAME)
);

/*==============================================================*/
/* Table: GENERALMETRIC                                         */
/*==============================================================*/
create table GENERALMETRIC
(
   IDMEDIA              int,
   GRANKING             numeric(8,0),
   GPERCENTAGE          numeric(8,0),
   GPERCENTAGEROUNDAD   numeric(8,0),
   UPDATEDATE           timestamp
);

/*==============================================================*/
/* Table: MEDIA                                                 */
/*==============================================================*/
create table MEDIA
(
   IDMEDIA              int not null auto_increment,
   IDCLASIFICATION      int not null,
   IDSTATEMEDIA         int not null,
   IDTYPE               int not null,
   TITLE                varchar(40),
   DESCRIPTION          varchar(650),
   TOTALEPISODES        varchar(5),
   STUDIO               varchar(50),
   MAINIMAGE            varchar(225),
   MINIATURE            varchar(225),
   DURATION             time,
   RELEASEDATE          timestamp,
   primary key (IDMEDIA)
);

/*==============================================================*/
/* Table: RANKING                                               */
/*==============================================================*/
create table RANKING
(
   IDMEDIA              int not null,
   EMAIL                varchar(80) not null,
   RANKING              numeric(8,0),
   PECENTAGE            numeric(8,0),
   PECENTAGEROUNDED     numeric(8,0),
   DATERANKING          timestamp,
   UPDATERANKING        timestamp,
   primary key (IDMEDIA, EMAIL)
);

/*==============================================================*/
/* Table: RELATIONSHIP                                          */
/*==============================================================*/
create table RELATIONSHIP
(
   IDRELATIONSHIP       int not null auto_increment,
   IDMEDIA              int,
   EMAIL                varchar(80),
   NUMBEREPISODE        varchar(4),
   MED_IDMEDIA          int,
   primary key (IDRELATIONSHIP)
);

/*==============================================================*/
/* Table: STATEMEDIA                                            */
/*==============================================================*/
create table STATEMEDIA
(
   IDSTATEMEDIA         int not null auto_increment,
   NAMESTATE            varchar(50),
   primary key (IDSTATEMEDIA)
);

/*==============================================================*/
/* Table: SUPERUSER                                             */
/*==============================================================*/
create table SUPERUSER
(
   EMAIL                varchar(80) not null,
   GENERATETOKEN        varchar(225),
   DATECREATED          timestamp,
   DATEUPDATED          timestamp,
   primary key (EMAIL)
);

/*==============================================================*/
/* Table: TYPE                                                  */
/*==============================================================*/
create table TYPE
(
   IDTYPE               int not null,
   NAMETYPE             varchar(50),
   DESCRIPTION          varchar(225),
   primary key (IDTYPE)
);

/*==============================================================*/
/* Table: UPLOAD                                                */
/*==============================================================*/
create table UPLOAD
(
   IDMEDIA              int not null,
   EMAIL                varchar(80) not null,
   NUMBEREPISODE        varchar(4) not null,
   DATEUPLOAD           timestamp,
   UPDATEUPLOAD         timestamp,
   STATEUPLOAD          bool,
   primary key (IDMEDIA, EMAIL, NUMBEREPISODE)
);

/*==============================================================*/
/* Table: USER                                                  */
/*==============================================================*/
create table USER
(
   EMAIL                varchar(80) not null,
   USER                 varchar(16) not null,
   PASSWORD             varchar(255),
   PUBLICNAME           varchar(50),
   URLPROFILEPICTURE    varchar(225),
   ACTIVEPROFILE        bool,
   primary key (EMAIL)
);

alter table CATEGORYMEDIA add constraint FK_CATEGORYCATEGORYMEDIA foreign key (IDCATEGORY)
      references CATEGORY (IDCATEGORY) on delete restrict on update restrict;

alter table CATEGORYMEDIA add constraint FK_MEDIACATEGORYMEDIA foreign key (IDMEDIA)
      references MEDIA (IDMEDIA) on delete restrict on update restrict;

alter table EMBEDFRAME add constraint FK_UPLOADEMBEDFRAME foreign key (IDMEDIA, EMAIL, NUMBEREPISODE)
      references UPLOAD (IDMEDIA, EMAIL, NUMBEREPISODE) on delete restrict on update restrict;

alter table GENERALMETRIC add constraint FK_MEDIAGENERALMETRIC foreign key (IDMEDIA)
      references MEDIA (IDMEDIA) on delete restrict on update restrict;

alter table MEDIA add constraint FK_CLASIFICATIONMEDIA foreign key (IDCLASIFICATION)
      references CLASIFICATION (IDCLASIFICATION) on delete restrict on update restrict;

alter table MEDIA add constraint FK_STATEMEDIAMEDIA foreign key (IDSTATEMEDIA)
      references STATEMEDIA (IDSTATEMEDIA) on delete restrict on update restrict;

alter table MEDIA add constraint FK_TYPEMEDIA foreign key (IDTYPE)
      references TYPE (IDTYPE) on delete restrict on update restrict;

alter table RANKING add constraint FK_MEDIARANKING foreign key (IDMEDIA)
      references MEDIA (IDMEDIA) on delete restrict on update restrict;

alter table RANKING add constraint FK_USERRANKING foreign key (EMAIL)
      references USER (EMAIL) on delete restrict on update restrict;

alter table RELATIONSHIP add constraint FK_MEDIARELATIONSHIP foreign key (MED_IDMEDIA)
      references MEDIA (IDMEDIA) on delete restrict on update restrict;

alter table RELATIONSHIP add constraint FK_UPLOADRELATIONSHIP foreign key (IDMEDIA, EMAIL, NUMBEREPISODE)
      references UPLOAD (IDMEDIA, EMAIL, NUMBEREPISODE) on delete restrict on update restrict;

alter table SUPERUSER add constraint FK_USERSUPERUSER foreign key (EMAIL)
      references USER (EMAIL) on delete restrict on update restrict;

alter table UPLOAD add constraint FK_MEDIAUPLOAD foreign key (IDMEDIA)
      references MEDIA (IDMEDIA) on delete restrict on update restrict;

alter table UPLOAD add constraint FK_USERUPLOAD foreign key (EMAIL)
      references USER (EMAIL) on delete restrict on update restrict;

