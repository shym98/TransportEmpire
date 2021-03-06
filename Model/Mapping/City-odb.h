// This file was generated by ODB, object-relational mapping (ORM)
// compiler for C++.
//

#ifndef CITY_ODB_H
#define CITY_ODB_H

// Begin prologue.
//
#include <odb/qt/version.hxx>
#if ODB_QT_VERSION != 2040000 // 2.4.0
#  error ODB and C++ compilers see different libodb-qt interface versions
#endif
#include <odb/qt/basic/mssql/qstring-traits.hxx>
#include <odb/qt/basic/mssql/qbyte-array-traits.hxx>
#include <odb/qt/basic/mssql/quuid-traits.hxx>
#include <odb/qt/containers/qhash-traits.hxx>
#include <odb/qt/containers/qlist-traits.hxx>
#include <odb/qt/containers/qlinked-list-traits.hxx>
#include <odb/qt/containers/qmap-traits.hxx>
#include <odb/qt/containers/qset-traits.hxx>
#include <odb/qt/containers/qvector-traits.hxx>
#include <odb/qt/date-time/mssql/qdate-traits.hxx>
#include <odb/qt/date-time/mssql/qtime-traits.hxx>
#include <odb/qt/date-time/mssql/qdate-time-traits.hxx>
#include <QtCore/QSharedPointer>
#include <odb/qt/smart-ptr/pointer-traits.hxx>
#include <odb/qt/smart-ptr/wrapper-traits.hxx>
//
// End prologue.

#include <odb/version.hxx>

#if (ODB_VERSION != 20400UL)
#error ODB runtime version mismatch
#endif

#include <odb/pre.hxx>

#include "Model/City.h"

#include "Database/Mapping/Entity-odb.h"
#include "Model/Mapping/Location-odb.h"

#include <memory>
#include <cstddef>
#include <string>
#include <utility>

#include <odb/core.hxx>
#include <odb/traits.hxx>
#include <odb/callback.hxx>
#include <odb/wrapper-traits.hxx>
#include <odb/pointer-traits.hxx>
#include <odb/container-traits.hxx>
#include <odb/session.hxx>
#include <odb/cache-traits.hxx>
#include <odb/polymorphic-info.hxx>
#include <odb/result.hxx>
#include <odb/polymorphic-object-result.hxx>

#include <odb/details/unused.hxx>
#include <odb/details/shared-ptr.hxx>

namespace odb
{
  // City
  //
  template <>
  struct class_traits< ::City >
  {
    static const class_kind kind = class_object;
  };

  template <>
  class access::object_traits< ::City >
  {
    public:
    typedef ::City object_type;
    typedef ::QSharedPointer< ::City > pointer_type;
    typedef odb::pointer_traits<pointer_type> pointer_traits;

    static const bool polymorphic = true;

    typedef ::db::Entity root_type;
    typedef ::db::Entity base_type;
    typedef object_traits<root_type>::discriminator_type discriminator_type;
    typedef polymorphic_concrete_info<root_type> info_type;

    static const std::size_t depth = 2UL;

    typedef object_traits< ::db::Entity >::id_type id_type;
    typedef object_traits< ::db::Entity >::version_type version_type;

    static const bool auto_id = false;

    static const bool abstract = false;

    static id_type
    id (const object_type&);

    typedef
    odb::pointer_cache_traits<
      object_traits<root_type>::pointer_type,
      odb::session >
    pointer_cache_traits;

    typedef
    odb::reference_cache_traits<
      root_type,
      odb::session >
    reference_cache_traits;

    static void
    callback (database&, object_type&, callback_event);

    static void
    callback (database&, const object_type&, callback_event);
  };
}

#include <odb/details/buffer.hxx>

#include <odb/mssql/version.hxx>
#include <odb/mssql/forward.hxx>
#include <odb/mssql/binding.hxx>
#include <odb/mssql/mssql-types.hxx>
#include <odb/mssql/query.hxx>

namespace odb
{
  // City
  //
  template <typename A>
  struct query_columns< ::City, id_mssql, A >:
    query_columns< ::db::Entity, id_mssql, typename A::base_traits >
  {
    // Entity
    //
    typedef query_columns< ::db::Entity, id_mssql, typename A::base_traits > Entity;

    // id
    //
    typedef
    mssql::query_column<
      mssql::value_traits<
        unsigned int,
        mssql::id_int >::query_type,
      mssql::id_int >
    id_type_;

    static const id_type_ id;

    // placeID
    //
    typedef
    mssql::query_column<
      mssql::value_traits<
        ::QString,
        mssql::id_string >::query_type,
      mssql::id_string >
    placeID_type_;

    static const placeID_type_ placeID;

    // formatedAddress
    //
    typedef
    mssql::query_column<
      mssql::value_traits<
        ::QString,
        mssql::id_string >::query_type,
      mssql::id_string >
    formatedAddress_type_;

    static const formatedAddress_type_ formatedAddress;

    // location
    //
    struct location_class_
    {
      location_class_ ()
      {
      }

      // lat
      //
      typedef
      mssql::query_column<
        mssql::value_traits<
          double,
          mssql::id_float8 >::query_type,
        mssql::id_float8 >
      lat_type_;

      static const lat_type_ lat;

      // lng
      //
      typedef
      mssql::query_column<
        mssql::value_traits<
          double,
          mssql::id_float8 >::query_type,
        mssql::id_float8 >
      lng_type_;

      static const lng_type_ lng;
    };

    static const location_class_ location;
  };

  template <typename A>
  const typename query_columns< ::City, id_mssql, A >::id_type_
  query_columns< ::City, id_mssql, A >::
  id (A::table_name, "[id]", 0);

  template <typename A>
  const typename query_columns< ::City, id_mssql, A >::placeID_type_
  query_columns< ::City, id_mssql, A >::
  placeID (A::table_name, "[placeID]", 0, 512);

  template <typename A>
  const typename query_columns< ::City, id_mssql, A >::formatedAddress_type_
  query_columns< ::City, id_mssql, A >::
  formatedAddress (A::table_name, "[formatedAddress]", 0, 512);

  template <typename A>
  const typename query_columns< ::City, id_mssql, A >::location_class_::lat_type_
  query_columns< ::City, id_mssql, A >::location_class_::
  lat (A::table_name, "[location_lat]", 0, 53);

  template <typename A>
  const typename query_columns< ::City, id_mssql, A >::location_class_::lng_type_
  query_columns< ::City, id_mssql, A >::location_class_::
  lng (A::table_name, "[location_lng]", 0, 53);

  template <typename A>
  const typename query_columns< ::City, id_mssql, A >::location_class_
  query_columns< ::City, id_mssql, A >::location;

  template <typename A>
  struct pointer_query_columns< ::City, id_mssql, A >:
    query_columns< ::City, id_mssql, A >
  {
  };

  template <>
  class access::object_traits_impl< ::City, id_mssql >:
    public access::object_traits< ::City >
  {
    public:
    typedef polymorphic_entry<object_type, id_mssql> entry_type;
    typedef object_traits_impl<root_type, id_mssql> root_traits;
    typedef object_traits_impl<base_type, id_mssql> base_traits;

    typedef root_traits::id_image_type id_image_type;

    static const info_type info;

    struct image_type
    {
      base_traits::image_type* base;

      // id
      //
      int id_value;
      SQLLEN id_size_ind;

      // placeID
      //
      char placeID_value[513];
      SQLLEN placeID_size_ind;

      // formatedAddress
      //
      char formatedAddress_value[513];
      SQLLEN formatedAddress_size_ind;

      // location
      //
      composite_value_traits< ::Location, id_mssql >::image_type location_value;

      std::size_t version;
    };

    struct extra_statement_cache_type;

    using object_traits<object_type>::id;

    static void
    bind (mssql::bind*,
          const mssql::bind* id,
          std::size_t id_size,
          image_type&,
          mssql::statement_kind);

    static void
    bind (mssql::bind*, id_image_type&, bool bind_version = true);

    static void
    init (image_type&,
          const object_type&,
          mssql::statement_kind);

    static void
    init (object_type&,
          const image_type&,
          database*,
          std::size_t = depth);

    static void
    init (id_image_type&, const id_type&, const version_type* = 0);

    static bool
    check_version (const std::size_t*, const image_type&);

    static void
    update_version (std::size_t*, const image_type&, mssql::binding*);

    typedef
    mssql::polymorphic_derived_object_statements<object_type>
    statements_type;

    typedef
    mssql::polymorphic_root_object_statements<root_type>
    root_statements_type;

    typedef mssql::query_base query_base_type;

    static const std::size_t column_count = 5UL;
    static const std::size_t id_column_count = 1UL;
    static const std::size_t inverse_column_count = 0UL;
    static const std::size_t readonly_column_count = 0UL;
    static const std::size_t managed_optimistic_column_count = 0UL;

    static const std::size_t separate_load_column_count = 0UL;
    static const std::size_t separate_update_column_count = 0UL;

    static const bool versioned = false;

    static const char persist_statement[];
    static const char* const find_statements[depth];
    static const std::size_t find_column_counts[depth];
    static const char update_statement[];
    static const char erase_statement[];
    static const char query_statement[];
    static const char erase_query_statement[];

    static const char table_name[];

    static void
    persist (database&, object_type&, bool top = true, bool dyn = true);

    static pointer_type
    find (database&, const id_type&);

    static bool
    find (database&, const id_type&, object_type&, bool dyn = true);

    static bool
    reload (database&, object_type&, bool dyn = true);

    static void
    update (database&, const object_type&, bool top = true, bool dyn = true);

    static void
    erase (database&, const id_type&, bool top = true, bool dyn = true);

    static void
    erase (database&, const object_type&, bool top = true, bool dyn = true);

    static result<object_type>
    query (database&, const query_base_type&);

    static unsigned long long
    erase_query (database&, const query_base_type&);

    public:
    static bool
    find_ (statements_type&,
           const id_type*,
           std::size_t = depth);

    static void
    load_ (statements_type&,
           object_type&,
           bool reload,
           std::size_t = depth);

    static void
    load_ (database&, root_type&, std::size_t);

    static root_traits::image_type&
    root_image (image_type&);

    static image_type*
    clone_image (image_type&);

    static void
    copy_image (image_type&, image_type&);

    static void
    free_image (image_type*);
  };

  template <>
  class access::object_traits_impl< ::City, id_common >:
    public access::object_traits_impl< ::City, id_mssql >
  {
  };

  // City
  //
}

#include "City-odb-inl.h"

#include <odb/post.hxx>

#endif // CITY_ODB_H
