using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace K2Field.Controls.ListViewConverter.Export
{
    public interface IExportFormatFactory
    {
        IExportFormat Export(DataTable dt);
    }
}
